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

// export const puppeteerArgs = ['--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--disabled-setupid-sandbox', '--single-process'];

export const puppeteerArgs = [
	'--single-process',
	'--autoplay-policy=user-gesture-required',
	'--disable-background-networking',
	'--disable-background-timer-throttling',
	'--disable-backgrounding-occluded-windows',
	'--disable-breakpad',
	'--disable-client-side-phishing-detection',
	'--disable-component-update',
	'--disable-default-apps',
	'--disable-dev-shm-usage',
	'--disable-domain-reliability',
	'--disable-extensions',
	'--disable-features=AudioServiceOutOfProcess',
	'--disable-hang-monitor',
	'--disable-ipc-flooding-protection',
	'--disable-notifications',
	'--disable-offer-store-unmasked-wallet-cards',
	'--disable-popup-blocking',
	'--disable-print-preview',
	'--disable-prompt-on-repost',
	'--disable-renderer-backgrounding',
	'--disable-setuid-sandbox',
	'--disable-speech-api',
	'--disable-sync',
	'--hide-scrollbars',
	'--ignore-gpu-blacklist',
	'--metrics-recording-only',
	'--mute-audio',
	'--no-default-browser-check',
	'--no-first-run',
	'--no-pings',
	'--no-sandbox',
	'--no-zygote',
	'--password-store=basic',
	'--use-gl=swiftshader',
	'--use-mock-keychain',
];

export const puppeteerUserAgent =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';

export const measure = (st: number, et: number, divide: number) => ((et - st) / divide)?.toFixed(3);
