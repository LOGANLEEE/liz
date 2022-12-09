import { stateTest } from 'lib/util';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(stateTest);
};

export default handler;
