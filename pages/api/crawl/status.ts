import { serverState } from 'lib/state';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log('status:', serverState.listStatus);
	res.status(200).json(serverState);
	return;
};

export default handler;
