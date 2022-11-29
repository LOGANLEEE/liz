// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DCINSIDEAccessor } from 'lib/crawl/logic/accessor/dcinside';
import { FMKOREAaccessor } from 'lib/crawl/logic/accessor/fmkorea';
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
	const { count: markedCount } = await markingFreshPosts();
	console.log('stage 1 finished');
	await writeLog({ name: 'markingFreshPosts', result: 1, body: JSON.stringify(markedCount) });

	// stage 2
	const tempHolder = [];
	tempHolder.push(await DCINSIDEAccessor());
	tempHolder.push(await FMKOREAaccessor());
	await writeLog({ name: 'accessor', result: 1, body: JSON.stringify(tempHolder) });
	console.log('stage 2 finished');
	// stage 3
	const { deletedCount, movedCount } = await moveMarkedPosts();
	await writeLog({ name: 'moveMarkedPosts', result: 1, body: JSON.stringify({ deletedCount, movedCount }) });
	console.log('stage 3 finished');

	await _prisma.$disconnect();
	console.log({
		stage1: { data: { markedCount }, message: `${markedCount} posts are marked` },
		stage2: { data: tempHolder },
		stage3: { data: { deletedCount, movedCount }, message: `${deletedCount} posts are deleted, ${movedCount} posts are moved` },
	});
	// return;
	// res.status(200).json({
	// 	stage1: { data: { markedCount }, message: `${markedCount} posts are marked` },
	// 	stage2: { data: DCResult },
	// 	stage3: { data: { deletedCount, movedCount }, message: `${deletedCount} posts are deleted, ${movedCount} posts are moved` },
	// });
	return;
}
