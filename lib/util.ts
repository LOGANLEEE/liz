export const delay = async (millisecond: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('');
		}, millisecond);
	});
};

export const masking = '---::--!@£!@£';

const numberFormatter = new Intl.NumberFormat();

export const numberFormat = (num: number) => numberFormatter.format(num);

export const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const puppeteerArgs = ['--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--disabled-setupid-sandbox'];

export const puppeteerUserAgent =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';

export type ServerState = {
	isCrawling: boolean;
};

export const serverState: ServerState = {
	isCrawling: false,
};
