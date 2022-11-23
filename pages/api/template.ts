import axios from 'axios';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { accessToWebsite } from '../../lib/crawl';

// const fetcher = (url) => axios.get(url).then((res) => res.data);

type Data = {
	data: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { data } = await accessToWebsite();
	res.status(200).json({ data });
}
