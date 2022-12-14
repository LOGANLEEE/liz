import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import type { TargetInfo } from 'lib/crawl/targetInfo';
import { puppeteerUserAgent } from 'lib/util';
import type { Browser } from 'puppeteer';

type UniversalAccessorArgs = {
	// page: Page;
	targetInfo: TargetInfo;
	browser: Browser;
	pageCount: number;
};

type UniversalAccessorReturn = {
	list: Prisma.fresh_postCreateInput[];
	isError: boolean;
	message: string;
	name: string;
};

export const pptrAccessor = async ({ browser, targetInfo, pageCount }: UniversalAccessorArgs): Promise<UniversalAccessorReturn> => {
	let isError = false;

	const tempHolder: Prisma.fresh_postCreateInput[] = [];
	const result = (message: string) => ({ list: tempHolder, isError, message, name: targetInfo.name });

	const page = await browser.newPage();
	await page.setUserAgent(puppeteerUserAgent);
	page.setDefaultNavigationTimeout(1000 * 60 * 3);
	// page.setDefaultNavigationTimeout(0);

	console.log(`===>  ${targetInfo.name}  ${pageCount}/${targetInfo.pageRange[1]} ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

	try {
		await page.goto(targetInfo.targetUrl(pageCount));
	} catch (error) {
		isError = true;
		// console.log(error);
		console.log(`page go to error occurred. skip ${targetInfo.name} ${pageCount} ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
		await page.close();
		return result('goto error');
	}

	try {
		for (let postCount = targetInfo.postRange[0]; postCount <= targetInfo.postRange[1]; postCount += targetInfo.postRange[2]) {
			if (targetInfo?.targetIndex) {
				const postIndex =
					(await page
						.waitForSelector(targetInfo?.targetIndex ? targetInfo?.targetIndex(postCount) : '')
						.then((element) => element?.evaluate((el) => el?.textContent?.trim()))
						.catch((err) => {
							// console.log('postIndex:', err);
							return '';
						})) || '';

				if (isNaN(parseInt(postIndex))) continue;
			}

			// remove garbage tag
			if (targetInfo?.garbage) {
				await Promise.all(
					targetInfo?.garbage(postCount)?.map(
						async (path) =>
							await page
								.waitForSelector(path)
								.then((element) => element?.evaluate((el) => el?.remove()))
								.catch((err) => {
									// console.log('garbage:', err);
									isError = true;
									return null;
								})
					)
				);
			}
			const title = await page
				.waitForSelector(targetInfo.title ? targetInfo.title(postCount) : targetInfo.link(postCount))
				.then((element) => element?.evaluate((el) => el?.textContent?.trim()))
				.catch((err) => {
					// console.log('title:', err);
					isError = true;
					return undefined;
				});

			const link = await page
				.waitForSelector(targetInfo.link(postCount))
				.then((element) => element?.evaluate((el) => el?.getAttribute('href')))
				.catch((err) => {
					// console.log('link:', err);
					isError = true;
					return undefined;
				});

			const author = await page
				.waitForSelector(targetInfo.author(postCount))
				.then((element) => element?.evaluate((el) => el?.textContent?.trim()))
				.catch((err) => {
					// console.log('author:', err);
					isError = true;
					return '::author::';
				});

			const hit = await page
				.waitForSelector(targetInfo.hit(postCount))
				.then((element) =>
					element?.evaluate((el) =>
						parseInt(
							el?.textContent?.trim()?.replaceAll(' ', '').replaceAll(',', '').replaceAll('.', '').replaceAll('k', '00') ||
								'-1'
						)
					)
				)
				.catch((err) => {
					// console.log('hit:', err);
					isError = true;
					return -1;
				});

			if (!title && !link) continue;

			tempHolder.push({
				title,
				link: `${targetInfo.targetBaseName}${link}`,
				hit,
				name: targetInfo.name,
				mark: false,
				author,
				content: null,
			});
		}
	} catch (error) {
		isError = true;
		await page.close();
		return result(`selector error ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
	}

	if (tempHolder.length < 1) {
		isError = true;
		return result('holder length 0');
	}

	await page.close();
	return result('good');
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });
