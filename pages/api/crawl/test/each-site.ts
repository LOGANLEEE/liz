import { axiosUniversalAccessor } from 'lib/crawl/logic/accessor/axiosUniversalAccessor';
import { targetList } from 'lib/crawl/targetInfo';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { targetName } = req.query;
	const targetInfo = targetList.find((e) => e.name === targetName);
	if (!targetInfo) {
		res.status(200).json({ message: 'no targetInfo' });
		return;
	}
	const result = await axiosUniversalAccessor({ targetInfo, pageCount: 1 });

	res.status(200).json(result);
};

export default handler;
