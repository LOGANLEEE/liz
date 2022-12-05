import { getFreshPost } from 'lib/crawl/logic/post';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const getFreshPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(401).json({ message: 'wrong http method' });
		return;
	}

	const { offset, limit, orderByHit } = req.body;
	// console.log('limit:', limit);
	// console.log('offset:', offset);

	await _prisma.$connect();
	const data = await getFreshPost({ limit, offset, orderByHit });
	res.status(200).json(data);
	await _prisma.$disconnect();
	return;
};

export default getFreshPostHandler;
