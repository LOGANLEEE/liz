import { communityNames } from 'lib/crawl/targetSiteInfo';

export type ServerState = {
	isCrawling: boolean;
	listStatus: {
		name: string;
		// eng: string;
		count: number;
		on: boolean;
	}[];
};

export const serverState: ServerState = {
	isCrawling: false,
	listStatus: Object.values(communityNames).map((e) => ({
		name: e,
		// eng: names[e],
		on: false,
		count: 0,
	})),
};
