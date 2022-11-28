import { FMKOREAaccessor } from 'lib/crawl/logic/accessor/fmkorea';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await _prisma.$connect();
	const result = await FMKOREAaccessor();
	res.status(200).json({ ...result });
	await _prisma.$disconnect();
};

export default handler;
