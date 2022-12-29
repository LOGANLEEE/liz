export const jobSiteNames = { wt: 'wanted' };

export type TargetJobSiteInfo = {
	name: string;
	enable: boolean;
	useAPI: boolean;
	targetBaseName?: string;
	targetUrl: (page: number) => string;
	pageRange: number[];
	postRange?: number[];
	garbage?: (idx: number) => string[];
	targetIndex?: (idx: number) => string;
	link: (idx: number) => string;
	title?: (idx: number) => string;
	uploadDate?: (idx: number) => string;
	linkHandler?: (val: string) => string;
	titleHandler?: (val: string) => string;
};

const WANTED_INFO: TargetJobSiteInfo = {
	name: jobSiteNames.wt,
	useAPI: true,
	targetBaseName: 'https://www.wanted.co.kr',
	enable: false,
	targetUrl: (page: number) =>
		// `https://www.wanted.co.kr/gigs/projects?page=${page}&job_industry=518&categories=&work_type_office=true&work_type_remote=true&isSearch=true&keyword=&page=1&is_recruiting=true&skills=1547%2C1449%2C10286%2C9551%2C1469`,
		`https://www.wanted.co.kr/gigs/api-v2/projects?page=${page}&work_type_office=true&work_type_remote=true&sort=createdAt&job_industry=518&skills=1547,1449,10286,9551,1469&keyword=&is_recruiting=true`,
	pageRange: [1, 1, 1],
	// postRange: [1, 20, 1],
	link: (idx: number) =>
		`#__next > div > main > div > div.List__ListStyle-sc-osn82h-0.djVagK > div > div:nth-child(${idx}) > div.title > h5 > a`,
	// #__next > div > main > div > div.List__ListStyle-sc-osn82h-0.djVagK > div > div:nth-child(1) > div.title > h5 > a
};
export const targetJobSiteList: TargetJobSiteInfo[] = [WANTED_INFO];
