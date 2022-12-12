import { accessorTemplate } from 'lib/crawl/logic/accessor/template';
import { afterStageCleanUp } from 'lib/crawl/logic/cleaner';
import { getBrowser } from 'lib/pptrInstace';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('===>crawling tester started');

	// await stagePreparation().then(async ({ count: markedCount }) => {
	// 	console.log(`stage1: ${markedCount} posts are marked`);
	// });

	const { browser } = await getBrowser();
	const result = await accessorTemplate({ browser }).finally(async () => {
		await browser.close();
	});

	console.log('====>crawling tester finished');
	// state 2
	console.log(result);

	// stage 3
	await afterStageCleanUp().then(async ({ deletedCount, movedCount }) => {
		console.log(`stage3:${deletedCount} posts are deleted, ${movedCount} posts are moved`);
	});

	res.status(200).json(result);
};

export default handler;
