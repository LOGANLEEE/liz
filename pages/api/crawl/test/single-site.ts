import { axiosAccessor } from 'lib/crawl/logic/accessor/axiosAccessor';
import { pptrAccessor } from 'lib/crawl/logic/accessor/pptrAccessor';
import { targetList } from 'lib/crawl/targetInfo';
import { writeLog } from 'lib/log';
import { getBrowser } from 'lib/pptrInstace';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { targetName } = req.query;
	const targetInfo = targetList.find((e) => e.name === targetName);
	if (!targetInfo) {
		res.status(200).json({ message: 'no targetInfo' });
		return;
	}

	const pageCount = 1;
	let result = await axiosAccessor({ targetInfo, pageCount });

	// if (result.isError) {
	// 	result = await pptrAccessor({ pageCount, targetInfo, browser: (await getBrowser()).browser });
	// }

	await writeLog({ result: 1, name: `${targetInfo.name} test`, body: JSON.stringify(result) });

	res.status(200).json(result);
};

export default handler;
