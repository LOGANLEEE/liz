// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pptrParallelRunner } from 'lib/crawl/logic/runner/pptrParallelRunner';
import { serverState } from 'lib/state';
import type { NextApiRequest, NextApiResponse } from 'next';
// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// res.status(200).json({ message: 'crawling is starting...' });
	if (serverState.isCrawling) {
		res.status(200).json({ message: 'parallel crawling is proceeding...' });
		return;
	}
	pptrParallelRunner();
	res.status(200).json({ message: ' parallelstart crawling...' });
	return;
}
