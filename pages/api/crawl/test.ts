import { accessorTemplate } from 'lib/crawl/logic/accessor/template';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await accessorTemplate();
	res.status(200).json({ test: 'test' });
};

export default handler;
