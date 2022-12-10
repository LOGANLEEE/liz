// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { universalAccessor } from 'lib/crawl/logic/accessor/universalAccessor';
import { markingFreshPosts, moveMarkedPosts } from 'lib/crawl/logic/cleaner';
import { infoList } from 'lib/crawl/targetInfo';
import { writeLog } from 'lib/log';
import { getBrowser } from 'lib/pptrInstace';
import { puppeteerUserAgent, serverState } from 'lib/util';
import type { NextApiRequest, NextApiResponse } from 'next';

// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// res.status(200).json({ message: 'crawling is starting...' });
	if (serverState.isCrawling) {
		res.status(200).json({ message: 'crawling is proceeding...' });
		return;
	}
	if (!serverState.isCrawling) res.status(200).json({ message: 'start crawling...' });

	serverState.isCrawling = true;

	// stage 1
	await markingFreshPosts()
		.then(async ({ count: markedCount }) => {
			console.log(`stage1: ${markedCount} posts are marked`);
			await writeLog({ name: 'markingFreshPosts', result: 1, body: JSON.stringify(markedCount) });
		})
		.catch(async (error) => await writeLog({ name: 'markingFreshPosts', result: 0, body: JSON.stringify(error) }));

	const startTime = performance.now();

	// stage 2
	const { browser } = await getBrowser();
	const targetInfos = infoList.filter((e) => e.enable);
	const tempHolder = [];
	const page = await browser.newPage();
	await page.setUserAgent(puppeteerUserAgent);
	page.setDefaultNavigationTimeout(0);

	for (const targetInfo of targetInfos) {
		const result = await universalAccessor({ targetInfo, page });
		tempHolder.push(result);
	}

	await page.close();
	await browser.close();
	const endTime = performance.now();

	console.log(`stage 2:, ${(endTime - startTime) / 1000 / 60} minutes`);
	tempHolder?.map((e) => console.log(e));
	await writeLog({ name: 'accessor', result: 1, body: JSON.stringify(tempHolder) });

	// stage 3
	await moveMarkedPosts()
		.then(async ({ deletedCount, movedCount }) => {
			console.log(`stage3:${deletedCount} posts are deleted, ${movedCount} posts are moved`);
			await writeLog({ name: 'moveMarkedPosts', result: 1, body: JSON.stringify({ deletedCount, movedCount }) });
		})
		.catch(async (error) => {
			await writeLog({ name: 'moveMarkedPosts', result: 0, body: JSON.stringify(error) });
		})
		.finally(() => {
			serverState.isCrawling = false;
		});

	return;
}
