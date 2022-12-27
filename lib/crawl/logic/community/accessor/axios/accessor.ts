import type { Prisma } from '@prisma/client';
import { load } from 'cheerio';
import { format } from 'date-fns';
import { _axiosCrawler } from 'lib/axiosInstance';
import { communityNames, TargetSiteInfo } from 'lib/crawl/targetSiteInfo';
import { humorUniCookie } from 'lib/util';

type UniversalAccessorArgs = {
	// page: Page;
	targetInfo: TargetSiteInfo;
	pageCount: number;
};

type UniversalAccessorReturn = {
	list: Prisma.fresh_postCreateInput[];
	isError: boolean;
	message: string;
	name: string;
};

export const accessor = async ({ targetInfo, pageCount }: UniversalAccessorArgs): Promise<UniversalAccessorReturn> => {
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
		const $ = load(data);

		for (let postCount = targetInfo.postRange[0]; postCount <= targetInfo.postRange[1]; postCount += targetInfo.postRange[2]) {
			if (targetInfo?.targetIndex) {
				if (targetInfo?.targetIndex(postCount) !== '') {
					const postIndex = $(targetInfo?.targetIndex(postCount))?.text()?.trim();
					if (isNaN(parseInt(postIndex))) continue;
				}
			}

			// remove garbage tag
			if (targetInfo?.garbage) {
				targetInfo.garbage(postCount)?.forEach((path) => {
					if (path) {
						$(path)?.remove();
					}
				});
			}
			let title = $(targetInfo.title ? targetInfo.title(postCount) : targetInfo.link(postCount))
				.text()
				?.trim();

			if (targetInfo.titleHandler && title) {
				title = targetInfo.titleHandler(title);
			}

			let link = $(targetInfo.link(postCount))?.attr('href');

			if (targetInfo.linkHandler && link) {
				link = targetInfo.linkHandler(link);
			}

			const author = $(targetInfo.author(postCount))?.text()?.trim();

			const hit = parseInt(
				$(targetInfo.hit(postCount))
					?.text()
					?.trim()
					?.replaceAll(' ', '')
					.replaceAll(',', '')
					.replaceAll('.', '')
					.replaceAll('k', '00')
					.replaceAll('조회', ''),
				10
			);

			// console.log('title:', title);
			// console.log('link:', `${targetInfo.targetBaseName}${link}`);
			// console.log('hit:', isNaN(hit) ? -1 : hit);
			// console.log('author:', author);

			if (!title && !link) continue;

			tempHolder.push({
				title,
				link: `${targetInfo.targetBaseName}${link}`,
				hit: isNaN(hit) ? -1 : hit,
				name: targetInfo.name,
				author,
				type: 0,
				mark: false,
				content: null,
			});
		}
		if (tempHolder.length < 1) {
			isError = true;
			throw 'holder length 0';
		}
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
