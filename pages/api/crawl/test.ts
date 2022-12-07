import { universalAccessor } from 'lib/crawl/logic/accessor/universalAccessor';
import { getBrowser } from 'lib/pptrInstace';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('===>crawling tester started');

	await _prisma.$connect();
	const { browser } = await getBrowser();
	const list = await universalAccessor({ browser });
	browser.close();

	console.log('====>crawling tester finished');

	res.status(200).json({ count: list.reduce(({ count, name }) => count) });
	await _prisma.$disconnect();
};

export default handler;
