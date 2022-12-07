import { universalAccessor } from 'lib/crawl/logic/accessor/universalAccessor';
import { DCINSIDEAccessor } from 'lib/crawl/logic/accessor/dcinside';
import { FMKOREAaccessor } from 'lib/crawl/logic/accessor/fmkorea';
import { PPOMPPUAccessor } from 'lib/crawl/logic/accessor/ppompu';
import { RULIWEBAccessor } from 'lib/crawl/logic/accessor/ruliweb';
import { getBrowser } from 'lib/pptrInstace';
import type { NextApiRequest, NextApiResponse } from 'next';
import { _prisma } from 'prisma/prismaInstance';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('===>crawling tester started');

	await _prisma.$connect();
	const { browser } = await getBrowser();
	const list = await universalAccessor({ browser });
	browser.close();
	// const result = await DCINSIDEAccessor();
	// const result = await RULIWEBAccessor();
	// const result = await FMKOREAaccessor();
	// const result = await PPOMPPUAccessor();

	console.log('====>crawling tester finished');

	res.status(200).json({ count: list.reduce(({ count, name }) => count) });
	await _prisma.$disconnect();
};

export default handler;
