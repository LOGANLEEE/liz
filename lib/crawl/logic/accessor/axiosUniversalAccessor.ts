import { Prisma } from '@prisma/client';
import { load } from 'cheerio';
import { format } from 'date-fns';
import { _axiosCrawler } from 'lib/axiosInstance';
import type { TargetInfo } from 'lib/crawl/targetInfo';

type UniversalAccessorArgs = {
	// page: Page;
	targetInfo: TargetInfo;
	pageCount: number;
};

type UniversalAccessorReturn = {
	list: Prisma.fresh_postCreateInput[];
	isError: boolean;
	message: string;
	name: string;
};

export const axiosUniversalAccessor = async ({ targetInfo, pageCount }: UniversalAccessorArgs): Promise<UniversalAccessorReturn> => {
	let isError = false;

	const tempHolder: Prisma.fresh_postCreateInput[] = [];
	const result = (message: string) => ({ list: tempHolder, isError, message, name: targetInfo.name });

	// console.log(`===>  ${targetInfo.name}  ${pageCount}/${targetInfo.pageRange[1]} ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

	const { data, err } = await _axiosCrawler
		.get(targetInfo.targetUrl(pageCount))
		.then((res) => ({ ...res, err: false }))
		.catch((err) => ({ err, data: undefined }));

	if (!data && err) return result(`axios error ${JSON.stringify(err)}`);

	try {
		const $ = load(data);

		for (let postCount = targetInfo.postRange[0]; postCount <= targetInfo.postRange[1]; postCount += targetInfo.postRange[2]) {
			if (targetInfo?.targetIndex) {
				const postIndex = $(targetInfo?.targetIndex ? targetInfo?.targetIndex(postCount) : '')
					.text()
					?.trim();

				if (isNaN(parseInt(postIndex))) continue;
			}

			// remove garbage tag
			if (targetInfo?.garbage) {
				await Promise.all(targetInfo?.garbage(postCount)?.map(async (path) => $(path)?.remove()));
			}
			const title = $(targetInfo.title ? targetInfo.title(postCount) : targetInfo.link(postCount))
				.text()
				?.trim();

			const link = $(targetInfo.link(postCount))?.attr('href');

			const author = $(targetInfo.author(postCount)).text()?.trim();

			const hit = parseInt(
				$(targetInfo.hit(postCount))
					.text()
					?.trim()
					?.replaceAll(' ', '')
					.replaceAll(',', '')
					.replaceAll('.', '')
					.replaceAll('k', '00'),
				10
			);

			if (!title && !link) continue;

			tempHolder.push({
				title,
				link: `${targetInfo.targetBaseName}${link}`,
				hit: isNaN(hit) ? -1 : hit,
				name: targetInfo.name,
				mark: false,
				author,
				content: null,
			});
		}
		return result('good');
	} catch (error) {
		console.log('parsing error: ', JSON.stringify(error));

		return result(`selector error ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
	}
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });
