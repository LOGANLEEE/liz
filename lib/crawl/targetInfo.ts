export const names = { dc: '디씨', fm: '에펨', rr: '루리웹', pp: '뿜뿌', ilbe: '일베', clien: '클리앙', bobae: '보배', iv: '인벤' };

export type TargetInfo = {
	name: string;
	enable: boolean;
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

export const DCINSIDE_INFO: TargetInfo = {
	name: names.dc,
	enable: false,
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
	enable: false,
	targetBaseName: '',
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
	enable: false,
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
	enable: false,
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

export const ILBE_INFO: TargetInfo = {
	name: names.ilbe,
	targetBaseName: 'https://www.ilbe.com',
	enable: false,
	targetUrl: (page: number) => `https://www.ilbe.com/list/ilbe?page=${page}&listSize=60&listStyle=list`,
	pageRange: [1, 2, 1],
	postRange: [5, 64, 1],
	garbage: (idx: number) => [],
	// targetIndex: (idx: number) => `${idx}`,
	link: (idx: number) => `#content-wrap > div > div.board-list > ul > li:nth-child(${idx}) > span.title > a`,
	author: (idx: number) => `#content-wrap > div > div.board-list > ul > li:nth-child(${idx}) > span.global-nick.nick > a`,
	hit: (idx: number) => `#content-wrap > div > div.board-list > ul > li:nth-child(${idx}) > span.view`,
};

export const CLIEN_INFO: TargetInfo = {
	name: names.clien,
	targetBaseName: 'https://www.clien.net',
	enable: false,
	targetUrl: (page: number) => `https://www.clien.net/service/recommend`,
	pageRange: [1, 1, 1],
	postRange: [1, 50, 1],
	garbage: (idx: number) => [],
	link: (idx: number) => `#div_content > div.recommend_underList > div:nth-child(${idx}) > div.list_title > a.list_subject`,
	title: (idx: number) =>
		`#div_content > div.recommend_underList > div:nth-child(${idx}) > div.list_title > a.list_subject > span.subject_fixed`,
	author: (idx: number) => `#div_content > div.recommend_underList > div:nth-child(${idx}) > div.list_author > span.nickname > span`,
	hit: (idx: number) => `#div_content > div.recommend_underList > div:nth-child(${idx}) > div.list_hit > span`,
};

export const BOBAE_INFO: TargetInfo = {
	name: names.bobae,
	targetBaseName: 'https://www.bobaedream.co.kr',
	enable: false,
	targetUrl: (page: number) =>
		`https://www.bobaedream.co.kr/list?code=best&s_cate=&maker_no=&model_no=&or_gu=10&or_se=desc&s_selday=&pagescale=50&info3=&noticeShow=&s_select=Subject&s_key=&level_no=&bestCode=&bestDays=&bestbbs=&vdate=&type=list&page=${page}`,
	pageRange: [1, 2, 1],
	postRange: [1, 50, 1],
	garbage: (idx: number) => [],
	link: (idx: number) => `#boardlist > tbody > tr:nth-child(${idx}) > td.pl14 > a.bsubject`,
	author: (idx: number) => `#boardlist > tbody > tr:nth-child(${idx}) > td.author02 > span.author`,
	hit: (idx: number) => `#boardlist > tbody > tr:nth-child(${idx}) > td.count`,
};

export const INVEN_INFO: TargetInfo = {
	name: names.iv,
	targetBaseName: '',
	enable: false,
	targetUrl: (page: number) => `https://www.inven.co.kr/board/webzine/2097?my=chu&p=${page}`,
	pageRange: [1, 2, 1],
	postRange: [1, 50, 1],
	garbage: (idx: number) => [
		`#new-board > form > div > table > tbody > tr:nth-child(${idx}) > td.tit > div > div > a > span`,
		`#new-board > form > div > table > tbody > tr:nth-child(${idx}) > td.tit > div > span.con-comment`,
	],
	link: (idx: number) => `#new-board > form > div > table > tbody > tr:nth-child(${idx}) > td.tit > div > div > a`,
	author: (idx: number) => `#new-board > form > div > table > tbody > tr:nth-child(${idx}) > td.user > span`,
	hit: (idx: number) => `#new-board > form > div > table > tbody > tr:nth-child(${idx}) > td.view`,
};

const template: TargetInfo = {
	name: names.dc,
	targetBaseName: 'template',
	enable: false,
	targetUrl: (page: number) => ``,
	pageRange: [1, 2, 1],
	postRange: [1, 101, 1],
	garbage: (idx: number) => [],
	targetIndex: (idx: number) => ``,
	link: (idx: number) => ``,
	author: (idx: number) => ``,
	hit: (idx: number) => ``,
};

export const targetList: TargetInfo[] = [
	DCINSIDE_INFO,
	PPOMPPU_INFO,
	RULIWEB_INFO,
	FMKOREA_INFO,
	ILBE_INFO,
	CLIEN_INFO,
	BOBAE_INFO,
	INVEN_INFO,
];
