import { format } from 'date-fns';
import { pptrAccessor } from 'lib/crawl/logic/community/accessor/pptrAccessor';
import { afterStageCleanUp } from 'lib/crawl/logic/cleaner';
import { targetSiteList } from 'lib/crawl/targetSiteInfo';
import { writeLog } from 'lib/log';
import { getBrowser } from 'lib/pptrInstace';
import { serverState } from 'lib/state';
import { measure } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';

export const pptrParallelRunner = async () => {
	serverState.isCrawling = true;

	serverState.listStatus = serverState.listStatus.map((e) => ({ ...e, on: false }));

	const { browser } = await getBrowser();

	const stage1startTime = performance.now();

	// stage 1
	const stage1Holder = await Promise.all(
		targetSiteList.map(async (targetInfo) => {
			const pageRange = Array.from(
				Array(targetInfo.pageRange[1] - targetInfo.pageRange[0] + 1).keys(),
				(x) => x + targetInfo.pageRange[2]
			);

			const st = performance.now();
			const pageHolder = await Promise.all(
				pageRange.map(async (pageCount) => await pptrAccessor({ targetInfo, pageCount, browser }))
			);

			// writeFile('./parallel.jsonc', JSON.stringify(pageHolder?.map(({ list }) => list).flat()));

			const { count } = await _prisma.fresh_post.createMany({
				data: pageHolder?.map(({ list }) => list).flat(),
			});

			// serverState.listStatus = serverState.listStatus.findIndex((a) => a.name === targetInfo.name);

			serverState.listStatus = serverState.listStatus.map((e) => {
				if (e.name === targetInfo.name) e.on = true;
				return e;
			});

			console.log(`${targetInfo.name}: ${measure(st, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

			return { count, isError: pageHolder.some((e) => e.isError), name: targetInfo.name };
		})
	);

	console.log(`stage1 >> ${measure(stage1startTime, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

	await writeLog({ name: 'accessor', result: 1, body: JSON.stringify(stage1Holder) });
	// stage1Holder?.map((e) => console.log(e));

	const stage2startTime = performance.now();
	await afterStageCleanUp({ type: 0 })
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
