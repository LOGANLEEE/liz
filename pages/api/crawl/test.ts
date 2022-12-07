import { accessorTemplate } from 'lib/crawl/logic/accessor/template';
import { universalAccessor } from 'lib/crawl/logic/accessor/universalAccessor';
import { markingFreshPosts, moveMarkedPosts } from 'lib/crawl/logic/cleaner';
import { getBrowser } from 'lib/pptrInstace';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('===>crawling tester started');

	await markingFreshPosts().then(async ({ count: markedCount }) => {
		console.log(`stage1: ${markedCount} posts are marked`);
	});

	const { browser } = await getBrowser();
	const result = await accessorTemplate({ browser }).finally(async () => {
		await browser.close();
	});

	console.log('====>crawling tester finished');
	// state 2
	console.log(result);

	// stage 3
	await moveMarkedPosts().then(async ({ deletedCount, movedCount }) => {
		console.log(`stage3:${deletedCount} posts are deleted, ${movedCount} posts are moved`);
	});

	res.status(200).json(result);
};

export default handler;
