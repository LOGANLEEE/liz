import { analyzeQuery } from 'lib/crawl/logic/post';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const getAnalyzeSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(401).json({ message: 'wrong http method' });
		return;
	}

	const { searchText } = req.body;
	// console.log('limit:', limit);
	// console.log('offset:', offset);

	await _prisma.$connect();
	const data = await analyzeQuery({ searchText });
	res.status(200).json(data);
	await _prisma.$disconnect();
	return;
};

export default getAnalyzeSearch;
