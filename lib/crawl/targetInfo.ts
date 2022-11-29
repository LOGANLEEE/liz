export const names = { dc: '디씨', fm: '에펨' };

export const DCINSIDE_INFO = {
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
};

export const DOGDRIP_INFO = {
	name: names.dog,
	targetUrl: (page: number) => `https://www.dogdrip.net/dogdrip?page=${page}`,
	page: [1, 5],
	range: [2, 21],
	rangeGap: 1,
	garbage: (idx: number) => [
		`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_tit.ub-word > a:nth-child(1) > strong`,
	],
	link: (idx: number) =>
		`#main > div > div.eq.section.secontent.background-color-content > div > div.ed.board-list > table > tbody > tr:nth-child(${idx}) > td.title > span > a`,
	title: (idx: number) =>
		`#main > div > div.eq.section.secontent.background-color-content > div > div.ed.board-list > table > tbody > tr:nth-child(${idx}) > td.title > span > a > span.ed.title-link`,
	author: (idx: number) =>
		`#main > div > div.eq.section.secontent.background-color-content > div > div.ed.board-list > table > tbody > tr:nth-child(${idx}) > td.author > a`,
};

export const FMKOREA_INFO = {
	name: names.fm,
	targetBaseName: 'https://www.fmkorea.com',
	targetUrl: (page: number) => `https://www.fmkorea.com/index.php?mid=best&listStyle=list&page=${page}`,
	pageRange: [1, 5, 1],
	postRage: [2, 21, 1],
	garbage: (idx: number) => [],
	link: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.title.hotdeal_var8 > a.hx`,
	//  #bd_189545458_0 > div > table > tbody > tr:nth-child(2) > td.title.hotdeal_var8 > a.hx
	author: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.author > span > a`,
	hit: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td:nth-child(6)`,
	uploadDate: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.time`,
};
