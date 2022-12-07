export const names = { dc: '디씨', fm: '에펨', rr: '루리웹', pp: '뿜뿌' };

type TargetInfo = {
	name: string;
	targetBaseName?: string;
	targetUrl: (page: number) => string;
	pageRange: number[];
	postRange: number[];
	garbage: (idx: number) => string[];
	targetIndex?: (idx: number) => string;
	link: (idx: number) => string;
	title?: (idx: number) => string;
	author: (idx: number) => string;
	hit: (idx: number) => string;
	uploadDate?: (idx: number) => string;
};
// https://www.ppomppu.co.kr/hot.php?id=&page=1&category=999&search_type=&keyword=&page_num=&del_flag=&bbs_list_category=0

const template: TargetInfo = {
	name: names.dc,
	targetBaseName: 'template',
	targetUrl: (page: number) => `${page}`,
	pageRange: [1, 2, 1],
	postRange: [1, 101, 1],
	garbage: (idx: number) => [`${idx}`],
	targetIndex: (idx: number) => `${idx}`,
	link: (idx: number) => `${idx}`,
	author: (idx: number) => `${idx}`,
	hit: (idx: number) => `${idx}`,
};

export const DCINSIDE_INFO: TargetInfo = {
	name: names.dc,
	targetBaseName: 'https://gall.dcinside.com',
	targetUrl: (page: number) => `https://gall.dcinside.com/board/lists/?id=dcbest&list_num=100&sort_type=N&search_head=9&page=${page}`,
	pageRange: [1, 1, 1],
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
	// #container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(3) > td.gall_writer.ub-writer > span.nickname > em
	// #container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(18) > td.gall_writer.ub-writer > span > em
	hit: (idx: number) =>
		`#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr:nth-child(${idx}) > td.gall_count`,
};

export const RULIWEB_INFO: TargetInfo = {
	name: names.rr,
	targetBaseName: 'https://bbs.ruliweb.com',
	targetUrl: (page: number) => `https://bbs.ruliweb.com/best/all/now?orderby=readcount&range=24h&page=${page}`,
	pageRange: [1, 5, 1],
	postRange: [1, 28, 1],
	garbage: (idx: number) => [`#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > a > span`],
	link: (idx: number) => `#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > a`,
	hit: (idx: number) =>
		`#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > div > span.hit > strong`,
	author: (idx: number) => `#best_body > table > tbody > tr:nth-child(${idx}) > td > div > div > div.col_10.text_wrapper > div > a.nick`,
};

export const FMKOREA_INFO: TargetInfo = {
	name: names.fm,
	targetBaseName: 'https://www.fmkorea.com',
	targetUrl: (page: number) => `https://www.fmkorea.com/index.php?mid=best&listStyle=list&page=${page}`,
	pageRange: [1, 5, 1],
	postRange: [2, 21, 1],
	garbage: (idx: number) => [],
	link: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.title.hotdeal_var8 > a.hx`,
	author: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.author > span > a`,
	hit: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td:nth-child(6)`,
	uploadDate: (idx: number) => `#bd_189545458_0 > div > table > tbody > tr:nth-child(${idx}) > td.time`,
};

export const PPOMPPU_INFO: TargetInfo = {
	name: names.pp,
	targetBaseName: 'https://www.ppomppu.co.kr',
	targetUrl: (page: number) =>
		`https://www.ppomppu.co.kr/hot.php?id=&page=${page}&category=999&search_type=&keyword=&page_num=&del_flag=&bbs_list_category=0`,
	pageRange: [1, 5, 1],
	postRange: [4, 23, 1],
	garbage: (idx: number) => [],
	link: (idx: number) =>
		`body > div > div.contents > div.container > div:nth-child(2) > div.board_box > table.board_table > tbody > tr:nth-child(${idx}) > td:nth-child(4) > a`,
	// body > div > div.contents > div.container > div:nth-child(2) > div.board_box > table.board_table > tbody > tr:nth-child(13) > td:nth-child(4)
	author: (idx: number) =>
		`body > div > div.contents > div.container > div:nth-child(2) > div.board_box > table.board_table > tbody > tr:nth-child(${idx}) > td:nth-child(2)`,
	hit: (idx: number) =>
		`body > div > div.contents > div.container > div:nth-child(2) > div.board_box > table.board_table > tbody > tr:nth-child(${idx}) > td:nth-child(7)`,
};

export const infoList: TargetInfo[] = [DCINSIDE_INFO, PPOMPPU_INFO, RULIWEB_INFO, FMKOREA_INFO];
