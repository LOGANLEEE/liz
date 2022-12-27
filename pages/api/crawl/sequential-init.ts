// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pptrSequentialRunner } from 'lib/crawl/logic/community/runner/pptrSequentialRunner';
import { serverState } from 'lib/state';
import type { NextApiRequest, NextApiResponse } from 'next';
// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// res.status(200).json({ message: 'crawling is starting...' });
	if (serverState.isCrawling) {
		res.status(200).json({ message: 'sequential crawling is proceeding...' });
		return;
	}
	pptrSequentialRunner();
	res.status(200).json({ message: 'sequential  start crawling...' });
	return;
}
