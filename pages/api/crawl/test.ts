import { DCINSIDEAccessor } from 'lib/crawl/logic/accessor/dcinside';
import { FMKOREAaccessor } from 'lib/crawl/logic/accessor/fmkorea';
import { RULIWEBAccessor } from 'lib/crawl/logic/accessor/ruliweb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('===>crawling tester started');

	await _prisma.$connect();
	// const result = await DCINSIDEAccessor();
	// const result = await RULIWEBAccessor();
	const result = await FMKOREAaccessor();

	console.log('====>crawling tester finished');
	res.status(200).json({ ...result });
	await _prisma.$disconnect();
};

export default handler;
