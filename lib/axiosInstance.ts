import axios from 'axios';
import { decode } from 'iconv-lite';

export const _axios = axios.create({});

_axios.interceptors.request.use(
	(req) => {
		// console.log('req:', req);

		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);

_axios.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const _axiosCrawler = axios.create({
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
	},
	// withCredentials: true,
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
		const isEUCKR = res.headers['content-type']?.includes('charset=euc-kr');

		const isHumorUni = res.config.url?.includes('humoruniv'); //link=ok; path=/; domain=.humoruniv.com

		if (isEUCKR || isHumorUni) {
			res.data = decode(Buffer.from(res.data), 'euc-kr');
		}
		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);
