import { format } from 'date-fns';
import { afterStageCleanUp } from 'lib/crawl/logic/cleaner';
import { writeLog } from 'lib/log';
import { serverState } from 'lib/state';
import { delay, measure } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';
import { targetJobSiteList } from 'lib/crawl/targetJobSiteInfo';
import { accessor } from 'lib/crawl/logic/job/accessor/axios/accessor';

export const parallelRunner = async () => {
	serverState.isCrawling = true;

	serverState.listStatus = serverState.listStatus.map((e) => ({ ...e, on: false }));

	const stage1startTime = performance.now();

	// stage 1
	const stage1Holder = await Promise.all(
		targetJobSiteList.map(async (targetInfo) => {
			const pageRange = Array.from(
				Array(targetInfo.pageRange[1] - targetInfo.pageRange[0] + 1).keys(),
				(x) => x + targetInfo.pageRange[2]
			);

			const st = performance.now();
			const pageHolder = await Promise.all(
				pageRange.map(async (pageCount, idx) => {
					await delay(idx * 800);
					const firstResult = await accessor({ targetInfo, pageCount });
					// if (firstResult.isError) {
					// 	return await pptrAccessor({ pageCount, targetInfo, browser: (await getBrowser()).browser });
					// }
					return firstResult;
				})
			);

			// const pageHolder = [];
			// for (let pageCount = targetInfo.pageRange[0]; pageCount <= targetInfo.pageRange[1]; pageCount += targetInfo.pageRange[2]) {
			// 	await delay(300 * pageCount);
			// 	const result = await axiosUniversalAccessor({ targetInfo, pageCount });
			// 	pageHolder.push(result);
			// }

			// writeFile('./parallel.jsonc', JSON.stringify(pageHolder?.map(({ list }) => list).flat()));

			const { count } = await _prisma.fresh_post.createMany({
				data: pageHolder?.map(({ list }) => list).flat(),
			});

			// serverState.listStatus = serverState.listStatus.findIndex((a) => a.name === targetInfo.name);

			serverState.listStatus = serverState.listStatus.map((e) => {
				if (e.name === targetInfo.name) e.on = true;
				return e;
			});
			const isError = pageHolder.some((e) => e.isError === true);

			console.log(
				`${targetInfo.name}(${targetInfo.pageRange[1]}): (${count} /${
					((targetInfo.postRange[1] - targetInfo.postRange[0] + 1) / targetInfo.postRange[2]) * targetInfo.pageRange[1]
				})${isError ? 'error' : 'pass'} ${measure(st, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
			);

			return { count, isError, name: targetInfo.name, message: JSON.stringify(pageHolder.map((e) => e.message)) };
		})
	);

	console.log(`stage1 >> ${measure(stage1startTime, performance.now(), 1000)} sec ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

	await writeLog({ name: 'accessor', result: 1, body: JSON.stringify(stage1Holder) });
	// stage1Holder?.map((e) => console.log(e));

	const stage2startTime = performance.now();
	await afterStageCleanUp({ type: 1 })
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

	// tempHolder?.map((e: any) => console.log(e?.info));
	// writeFile('dummy1.jsonc', JSON.stringify(tempHolder));
};
