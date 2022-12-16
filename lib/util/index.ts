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

export const humorUniCookie = `link=ok; c_cpuid_uuid=c26-f8a8-0e76; c_check=d2acd7807c7b4d43411b2ca03c6b2cfa; c_cpuid=H-68f6-b224; c_cpuid_set=wOLfwOR3TpSlTprV7qjlvtLlZnCGwJDVvJwkTlHo; __utmc=150955945; __utmz=150955945.1671054969.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); c_uuid_global=c26-f8a8-0e76; hu_auto_cook=Fl9; __utma=150955945.387003015.1671054969.1671054969.1671056936.2; __utmb=150955945.0.10.1671056936; adfit_sdk_id=2523df7b-38dd-4279-b3df-ee7d0d3a3f29; cto_bundle=5A9yzl9RWjBPVXhGOFlNbnc4QiUyRiUyRjBxRmxBV1JXc29GZzdpJTJCOHhsVUM0VWQ4NlViJTJGVEpiQ3dsQXFjMTBGZjJzNXFsZllvVlRFTSUyQkIybjMlMkZUc0xSMzVYSVpZVGxjRGglMkZoN0pCWUlFejJzRTExOFdCNlpGdU9OS1c0WjlRYlh6MnEwN2h6V0NpRldwbEtzOW0xWSUyRktyZGhmcnJtSGtJaHBMbGVqZUFZc21Hd1RxN25jNmUlMkZhR014aktFTGVwUDclMkJHWnB1eFc5MzB1T25Fa0paRDVpWUp6MG5BWUElM0QlM0Q; wcs_bt=395c7d0a9352ac:1671057182`;

export const NavigationItems = [
	{ name: 'Community', href: '/community' },
	{ name: 'Freelancer', href: '/freelancer' },
	{ name: 'About', href: '/about' },
];
