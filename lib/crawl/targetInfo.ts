export const names = { dc: '디씨', fm: '에펨', rr: '루리웹' };

export const DCINSIDE_INFO = {
	name: names.dc,
	targetHostName: 'https://gall.dcinside.com',
	targetUrl: (page: number) => `https://gall.dcinside.com/board/lists/?id=dcbest&list_num=100&sort_type=N&search_head=9&page=${page}`,
	pageRange: [1, 2, 1],
	postRange: [1, 101, 1],
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

export const RULIWEB_INFO = {
	name: names.rr,
	targetBaseName: 'https://bbs.ruliweb.com',
	targetUrl: (page: number) => `https://bbs.ruliweb.com/best/all/now?orderby=readcount&range=24h&page=${page}`,
	pageRange: [1, 10, 1],
	postRange: [1, 28, 1],
	garbage: (idx: number) => [`#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > a > span`],
	title: (idx: number) => `#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > a`,
	hit: (idx: number) =>
		`#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > div > span.hit > strong`,
	author: (idx: number) => `#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > div > a.nick`,
};

export const FMKOREA_INFO = {
	name: names.fm,
	targetBaseName: 'https://www.fmkorea.com',
	targetUrl: (page: number) => `https://www.fmkorea.com/index.php?mid=best&listStyle=list&page=${page}`,
	pageRange: [1, 10, 1],
	postRange: [2, 21, 1],
	garbage: (idx: number) => [],
	link: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.title.hotdeal_var8 > a.hx`,
	//  #bd_189545458_0 > div > table > tbody > tr:nth-child(2) > td.title.hotdeal_var8 > a.hx
	author: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.author > span > a`,
	hit: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td:nth-child(6)`,
	uploadDate: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.time`,
};
