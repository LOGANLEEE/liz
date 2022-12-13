import axios from 'axios';
import { decode } from 'iconv-lite';

export const _axios = axios.create({});

axios.interceptors.request.use(
	(req) => {
		// console.log('req:', req);

		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(res) => {
		const ctype = res.headers['content-type'];

		if (ctype?.includes('charset=euc-kr')) res.data = decode(Buffer.from(res.data), 'euc-kr');

		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const _axiosCrawler = axios.create({
	// headers: {
	// 'User-Agent':
	// 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
	// },
	responseType: 'arraybuffer',
	// responseEncoding: 'binary',
	// responseEncoding: 'utf8',
	// validateStatus: function (status) {
	// 	return status < 400; // Resolve only if the status code is less than 500
	// },
});

_axiosCrawler.interceptors.request.use(
	(req) => {
		// console.log('req:', req);

		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);

_axiosCrawler.interceptors.response.use(
	(res) => {
		const ctype = res.headers['content-type'];

		if (ctype?.includes('charset=euc-kr')) {
			res.data = decode(Buffer.from(res.data), 'euc-kr');
		}
		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);
