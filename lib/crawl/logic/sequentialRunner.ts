import { format } from 'date-fns';
import { writeFile } from 'fs/promises';
import { universalAccessor } from 'lib/crawl/logic/accessor/universalAccessor';
import { afterStageCleanUp } from 'lib/crawl/logic/cleaner';
import { targetList } from 'lib/crawl/targetInfo';
import { writeLog } from 'lib/log';
import { getBrowser } from 'lib/pptrInstace';
import { serverState } from 'lib/state';
import { measure } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';

export const sequentialRunner = async () => {
	serverState.isCrawling = true;

	serverState.listStatus = serverState.listStatus.map((e) => ({ ...e, on: false }));

	const { browser } = await getBrowser();

	const stage1Holder = [];

	const stage1startTime = performance.now();

	// stage 1
	for (const targetInfo of targetList) {
		try {
			const st = performance.now();
			for (let pageCount = targetInfo.pageRange[0]; pageCount <= targetInfo.pageRange[1]; pageCount += targetInfo.pageRange[2]) {
				const pageHolder = [];
				const pageResult = await universalAccessor({ targetInfo, pageCount, browser });
				pageHolder.push(pageResult);

				const { count } = await _prisma.fresh_post.createMany({
					data: pageHolder?.map(({ list }) => list).flat(),
				});

				serverState.listStatus = serverState.listStatus.map((e) => {
					if (e.name === targetInfo.name) e.on = true;
					return e;
				});

				stage1Holder.push({ count, isError: pageHolder.some((e) => e.isError), name: targetInfo.name });
				continue;
			}
			console.log(`${targetInfo.name}: ${measure(st, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
		} catch (error) {
			console.log(`error stage 1 >> ${JSON.stringify(error)}`);
			continue;
		}
	}

	console.log(`stage1 >> ${measure(stage1startTime, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

	await writeLog({ name: 'accessor', result: 1, body: JSON.stringify(stage1Holder) });
	// stage1Holder?.map((e) => console.log(e));

	const stage2startTime = performance.now();
	await afterStageCleanUp()
		.then(async ({ deletedCount, movedCount, updatedCount }) => {
			console.log(`stage2 >> ${deletedCount} deleted / ${movedCount} moved / ${updatedCount} updated`);
			await writeLog({ name: 'moveMarkedPosts', result: 1, body: JSON.stringify({ deletedCount, movedCount }) });
		})
		.catch(async (error) => await writeLog({ name: 'moveMarkedPosts', result: 0, body: JSON.stringify(error) }))
		.finally(() => {
			console.log(`stage2 >> ${measure(stage2startTime, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
			serverState.isCrawling = false;
			serverState.listStatus = serverState.listStatus.map((e) => ({ ...e, on: false }));
		});

	await browser.close();

	// tempHolder?.map((e: any) => console.log(e?.info));
	// writeFile('dummy1.jsonc', JSON.stringify(tempHolder));
};
