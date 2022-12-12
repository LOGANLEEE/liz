import { serverState } from 'lib/state';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json(serverState);

	serverState.isCrawling = true;

	setTimeout(() => {
		serverState.isCrawling = false;
	}, 5000);
	return;
};

export default handler;
