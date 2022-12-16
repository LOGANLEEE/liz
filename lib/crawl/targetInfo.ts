export const names = {
	pg: 'PGR21',
	nt: '네이트판',
	ud: '웃대',
	gs: '가생이',
	ou: '오유',
	ck: '82쿡',
	slr: 'SLR',
	dc: '디씨',
	fm: '에펨',
	rr: '루리웹',
	pp: '뿜뿌',
	ilbe: '일베',
	clien: '클리앙',
	bobae: '보배',
	iv: '인벤',
	et: '이토',
};

export type TargetInfo = {
	name: string;
	enable: boolean;
	targetBaseName?: string;
	targetUrl: (page: number) => string;
	pageRange: number[];
	postRange: number[];
	garbage?: (idx: number) => string[];
	targetIndex?: (idx: number) => string;
	link: (idx: number) => string;
	title?: (idx: number) => string;
	author: (idx: number) => string;
	hit: (idx: number) => string;
	uploadDate?: (idx: number) => string;
	linkHandler?: (val: string) => string;
	titleHandler?: (val: string) => string;
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

export const ETOLAND_INFO: TargetInfo = {
	name: names.et,
	targetBaseName: 'https://www.etoland.co.kr/bbs',
	enable: false,
	targetUrl: (page: number) => `https://www.etoland.co.kr/bbs/hit.php?stx_h=day&bo_table_n=&page=1&sword=`,
	pageRange: [1, 1, 1],
	postRange: [5, 64, 1],
	targetIndex: (idx: number) => `#container > div.right > div.board_hit_wrap > ul > li:nth-child(${idx}) > div.board > a`,

	garbage: (idx: number) => [
		`#container > div.right > div.board_hit_wrap > ul > li.list.is_notice`,
		`#container > div.right > div.board_hit_wrap > ul > li.list.ad_list`,
	],

	title: (idx: number) =>
		`#container > div.right > div.board_hit_wrap > ul > li:nth-child(${idx}) > div.subject > a.sub_link > span.subject_txt`,
	link: (idx: number) => `#container > div.right > div.board_hit_wrap > ul > li:nth-child(${idx}) > div.subject > a.sub_link`,
	linkHandler: (val: string) => val.replaceAll('./', '/'),
	author: (idx: number) => `#container > div.right > div.board_hit_wrap > ul > li:nth-child(${idx}) > div.writer > a > span`,
	hit: (idx: number) => `#container > div.right > div.board_hit_wrap > ul > li:nth-child(${idx}) > div.wr_hit`,
};
// http://www.slrclub.com/bbs/zboard.php?id=best_article
const SLR_INFO: TargetInfo = {
	name: names.slr,
	targetBaseName: 'http://www.slrclub.com',
	enable: false,
	targetUrl: (page: number) => `http://www.slrclub.com/bbs/zboard.php?id=best_article`,
	pageRange: [1, 1, 1],
	postRange: [1, 30, 1],
	link: (idx: number) => `#bbs_list > tbody > tr:nth-child(${idx}) > td.sbj > a`,
	author: (idx: number) => `#bbs_list > tbody > tr:nth-child(${idx}) > td.list_name > span`,
	hit: (idx: number) => `#bbs_list > tbody > tr:nth-child(${idx}) > td.list_click.no_att`,
};

const COOK_INFO: TargetInfo = {
	name: names.ck,
	targetBaseName: 'https://www.82cook.com',
	enable: false,
	targetUrl: (page: number) => `https://www.82cook.com/entiz/enti.php?bn=15&page=${page}`,
	pageRange: [1, 1, 1],
	postRange: [1, 10, 1],

	link: (idx: number) => `#column1 > div.leftbox.Best > ul > li:nth-child(${idx}) > a`,
	author: (idx: number) => ``,
	hit: (idx: number) => ``,
};

const TODAY_HUMOR_INFO: TargetInfo = {
	name: names.ou,
	targetBaseName: 'https://www.todayhumor.co.kr',
	enable: false,
	targetUrl: (page: number) => `https://www.todayhumor.co.kr/board/list.php?table=bestofbest&page=${page}`,
	pageRange: [1, 2, 1],
	postRange: [2, 31, 1],

	link: (idx: number) => `body > div.whole_box > div > div > table > tbody > tr:nth-child(${idx}) > td.subject > a`,
	author: (idx: number) => `body > div.whole_box > div > div > table > tbody > tr:nth-child(${idx}) > td.name > a`,
	hit: (idx: number) => `body > div.whole_box > div > div > table > tbody > tr:nth-child(${idx}) > td.hits`,
};

const GASENGI_INFO: TargetInfo = {
	name: names.gs,
	targetBaseName: 'http://www.gasengi.com',
	enable: false,
	targetUrl: (page: number) => {
		if (page === 1) return `http://www.gasengi.com/main/board.php?bo_table=commu08`;
		if (page === 2) return `http://www.gasengi.com/main/board.php?bo_table=humor04`;
		return '';
	},
	pageRange: [1, 2, 1],
	postRange: [1, 10, 1],
	link: (idx: number) => {
		if (idx <= 5) return `#rightcolumn > div.rank_div > div.rank_dbox > ol > span:nth-child(1) > li:nth-child(${idx}) > a`;
		if (idx >= 6) return `#rightcolumn > div.rank_div > div.rank_dbox > ol > span:nth-child(2) > li:nth-child(${idx - 5}) > a`;
		return '';
	},
	linkHandler: (val: string) => val.replaceAll('../', '/'),
	author: (idx: number) => ``,
	hit: (idx: number) => ``,
};

const HUMOR_UNI_INFO: TargetInfo = {
	name: names.ud,
	targetBaseName: 'http://web.humoruniv.com/board/humor/',
	enable: false,
	targetUrl: (page: number) => `http://web.humoruniv.com/board/humor/list.html?table=pds&st=day&pg=${page - 1}`,
	pageRange: [1, 5, 1],
	postRange: [1, 39, 2],
	garbage: (idx: number) => [`#post_list > tbody > tr:nth-child(${idx}) > td.li_sbj > a > span`],
	link: (idx: number) => `#post_list > tbody > tr:nth-child(${idx}) > td.li_sbj > a`,
	author: (idx: number) => `#post_list > tbody > tr:nth-child(${idx}) > td.li_icn > table > tbody > tr > td.g6 > span > span`,
	hit: (idx: number) => `#post_list > tbody > tr:nth-child(${idx}) > td:nth-child(5)`,
};
// https://pann.nate.com/talk/ranking?rankingType=total&page=1
const NATE_INFO: TargetInfo = {
	name: names.nt,
	targetBaseName: 'https://pann.nate.com',
	enable: false,
	targetUrl: (page: number) => `https://pann.nate.com/talk/ranking?rankingType=total&page=${page}`,
	pageRange: [1, 2, 1],
	postRange: [1, 50, 1],
	link: (idx: number) =>
		`#container > div.content.sub > div.mainarea > div.tsCnt > div.cntList > ul > li:nth-child(${idx}) > dl > dt > a`,
	hit: (idx: number) =>
		`#container > div.content.sub > div.mainarea > div.tsCnt > div.cntList > ul > li:nth-child(${idx}) > dl > dd.info > span.count`,
	author: (idx: number) => ``,
};

const PGR_INFO: TargetInfo = {
	name: names.pg,
	targetBaseName: 'https://www.pgr21.com',
	enable: false,
	targetUrl: (page: number) => `https://www.pgr21.com/humor/0?1=1&page=${page}`,
	pageRange: [1, 2, 1],
	postRange: [0, 22, 1],
	targetIndex: (idx: number) => `#TR${idx} > td.tdnum`,
	titleHandler: (val: string) => val?.slice(4, -1),
	link: (idx: number) => `#TR${idx} > td.tdsub.new > a`,
	hit: (idx: number) => `#TR${idx} > td.tdhit`,
	author: (idx: number) => `#TR${idx} > td.tdname > span`,
};

export const targetList: TargetInfo[] = [
	PGR_INFO,
	HUMOR_UNI_INFO,
	NATE_INFO,
	GASENGI_INFO,
	TODAY_HUMOR_INFO,
	COOK_INFO,
	SLR_INFO,
	DCINSIDE_INFO,
	PPOMPPU_INFO,
	RULIWEB_INFO,
	FMKOREA_INFO,
	ILBE_INFO,
	CLIEN_INFO,
	BOBAE_INFO,
	INVEN_INFO,
	ETOLAND_INFO,
];
