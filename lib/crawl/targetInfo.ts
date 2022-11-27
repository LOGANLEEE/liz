export const names = { dc: '디씨', dq: '더쿠' };

export const targetInfo = [
	{
		name: names.dc,
		targetHostName: 'https://gall.dcinside.com',
		targetUrl: (page: number) => `https://gall.dcinside.com/board/lists/?id=dcbest&list_num=100&sort_type=N&search_head=9&page=${page}`,
		page: [1, 2],
		range: [1, 101],
		rangeGap: 1,
		garbage: (idx: number) => [
			`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_tit.ub-word > a:nth-child(1) > strong`,
		],
		targetIndex: (idx: number) =>
			`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_num`,
		link: (idx: number) =>
			`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_tit.ub-word > a:nth-child(1)`,
		author: (idx: number) =>
			`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_writer.ub-writer > span.nickname`,
		hit: (idx: number) =>
			`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_count`,
	},
];
