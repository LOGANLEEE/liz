import { serverState } from 'lib/util';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(serverState);
};

export default handler;
