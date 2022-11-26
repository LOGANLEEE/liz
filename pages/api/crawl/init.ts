// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { markingFreshPosts, moveMarkedPosts } from 'lib/crawl/logic/cleaner';
import { DCINSIDEAccessor } from 'lib/crawl/logic/dc';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// res.status(200).json({ message: 'crawling is starting...' });
	await _prisma.$connect();

	// stage 1
	const { count: markedCount } = await markingFreshPosts();
	console.log('stage 1 finished');

	// stage 2
	const result = await DCINSIDEAccessor();
	console.log('stage 2 finished');
	// stage 3
	const { deletedCount, movedCount } = await moveMarkedPosts();
	console.log('stage 3 finished');

	await _prisma.$disconnect();
	console.log({
		stage1: { data: { markedCount }, message: `${markedCount} posts are marked` },
		stage2: { data: result },
		stage3: { data: { deletedCount, movedCount }, message: `${deletedCount} posts are deleted, ${movedCount} posts are moved` },
	});
	// return;
	res.status(200).json({
		stage1: { data: { markedCount }, message: `${markedCount} posts are marked` },
		stage2: { data: result },
		stage3: { data: { deletedCount, movedCount }, message: `${deletedCount} posts are deleted, ${movedCount} posts are moved` },
	});
	return;
}
