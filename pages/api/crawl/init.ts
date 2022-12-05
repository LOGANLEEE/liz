// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DCINSIDEAccessor } from 'lib/crawl/logic/accessor/dcinside';
import { FMKOREAaccessor } from 'lib/crawl/logic/accessor/fmkorea';
import { RULIWEBAccessor } from 'lib/crawl/logic/accessor/ruliweb';
import { markingFreshPosts, moveMarkedPosts } from 'lib/crawl/logic/cleaner';
import { writeLog } from 'lib/log';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// res.status(200).json({ message: 'crawling is starting...' });
	await _prisma.$connect();
	res.status(200).json({ message: 'initializing crawling ...' });

	// stage 1
	await markingFreshPosts()
		.then(async ({ count: markedCount }) => {
			console.log(`stage1: ${markedCount} posts are marked`);
			await writeLog({ name: 'markingFreshPosts', result: 1, body: JSON.stringify(markedCount) });
		})
		.catch(async (error) => await writeLog({ name: 'markingFreshPosts', result: 0, body: JSON.stringify(error) }));

	// stage 2
	// try {
	const tempHolder = await Promise.all(
		[await DCINSIDEAccessor(), await FMKOREAaccessor(), await RULIWEBAccessor()].map((result) => result)
	);

	console.log(`stage 2: ${JSON.stringify(tempHolder.map((e) => e))}`);
	await writeLog({ name: 'accessor', result: 1, body: JSON.stringify(tempHolder) });
	// } catch (error) {
	// await writeLog({ name: 'accessor', result: 0, body: JSON.stringify(error) });
	// }

	// stage 3
	await moveMarkedPosts()
		.then(async ({ deletedCount, movedCount }) => {
			console.log(`stage3:${deletedCount} posts are deleted, ${movedCount} posts are moved`);
			await writeLog({ name: 'moveMarkedPosts', result: 1, body: JSON.stringify({ deletedCount, movedCount }) });
		})
		.catch(async (error) => {
			await writeLog({ name: 'moveMarkedPosts', result: 1, body: JSON.stringify(error) });
		});

	await _prisma.$disconnect();
	return;
}
