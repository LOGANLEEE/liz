import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { _axiosCrawler } from 'lib/axiosInstance';
import { TargetJobSiteInfo } from 'lib/crawl/targetJobSiteInfo';
import { communityNames } from 'lib/crawl/targetSiteInfo';
import { humorUniCookie } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';

type UniversalAccessorArgs = {
	// page: Page;
	targetInfo: TargetJobSiteInfo;
	pageCount: number;
};

type UniversalAccessorReturn = {
	list: Prisma.fresh_postCreateInput[];
	isError: boolean;
	message: string;
	name: string;
};

const wantedAccessor = async ({ targetInfo, pageCount }: UniversalAccessorArgs): Promise<UniversalAccessorReturn> => {
	let isError = false;

	const tempHolder: Prisma.fresh_postCreateInput[] = [];
	const result = (message: string) => ({ list: tempHolder, isError, message, name: targetInfo.name });

	const headers: any = {};

	if (targetInfo.name === communityNames.ud) {
		headers.Cookie = humorUniCookie;
	}

	const { data, err } = await _axiosCrawler
		.get(targetInfo.targetUrl(pageCount), {
			headers,
		})
		.then((res) => ({ ...res, err: false }))
		.catch((err) => ({ err, data: undefined }));

	if (!data && err) {
		isError = true;
		return result(`axios error: ${JSON.stringify(err)}`);
	}

	// await writeFile('./dummy.html', data);

	try {
		const tempHolder = await Promise.all(
			(data as WantedData).rows
				?.filter((e) => e.is_recruiting === true)
				?.map(({ title, startAt, salary, work_place, term }) => {
					return {
						title,
						start_at: startAt,
						minimum: salary.start,
						maximum: salary.end,
						name: targetInfo.name,
						work_type: work_place === 'remote' ? '원격' : '상주',
						pay_type: salary.salary_type === 'monthly' ? 2 : 1,
						period: term.start,
						// period_unit: string | null,
						mark: false,
					};
				})
		);

		if (tempHolder.length < 1) {
			isError = true;
			throw 'holder length 0';
		}
		// await _prisma.fresh_job_post.createMany({ data: tempHolder });

		return result('good');
	} catch (error) {
		isError = true;
		// console.log('parsing error: ', error);

		return result(`selector error ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
	}
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });
export default wantedAccessor;

type WantedData = {
	status: 'success';
	count: { total: number; page: number; pages: number };
	rows: [
		{
			id: number;
			title: string;
			titleDisplay: string;
			work_type?: string;
			work_place: string;
			work_place_txt: string;
			salary: { salary_type: string; start: number; end: number };
			startAt: string;
			negotiable_start: false;
			address: null | string;
			text_work_place: string;
			term: { term_type: string; start: number; end: null | number };
			text_term_type: string;
			text_salary_type: string;
			apply_count: number;
			count_matches: number;
			directApplyCount: number;
			clientSuggestAcceptCount: number;
			managerSuggestAcceptCount: number;
			is_suggest: false;
			jobs: string;
			skills: string;
			new_project: true;
			match_id: number;
			match_status_expert: string;
			is_recruiting: true;
			is_bookmark: false;
			jobsV2: [{ jobIndustryId: number; jobIndustryTitle: string; jobCategoryId: number; jobCategoryTitle: string }];
		}
	];
};
