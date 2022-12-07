import { infoList } from 'lib/crawl/targetInfo';
import { puppeteerUserAgent } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';
import { Browser } from 'puppeteer';

type universalAccessorArgs = {
	browser: Browser;
};

export const universalAccessor = async ({ browser }: universalAccessorArgs) => {
	const result = await Promise.all(
		infoList
			.filter((e) => e.enable)
			.map(async (targetInfo) => {
				const page = await browser.newPage();
				await page.setUserAgent(puppeteerUserAgent);

				let totalCount = 0;
				for (let pageCount = targetInfo.pageRange[0]; pageCount <= targetInfo.pageRange[1]; pageCount += targetInfo.pageRange[2]) {
					console.log(`===> ${targetInfo.name} ${pageCount} / ${targetInfo.pageRange[1]}`);
					await page.goto(targetInfo.targetUrl(pageCount));
					const tempHolder = [];

					for (
						let postCount = targetInfo.postRange[0];
						postCount <= targetInfo.postRange[1];
						postCount += targetInfo.postRange[2]
					) {
						if (targetInfo?.targetIndex) {
							const postIndex =
								(await page
									.waitForSelector(targetInfo?.targetIndex ? targetInfo?.targetIndex(postCount) : '')
									.then((element) => element?.evaluate((el) => el?.textContent?.trim()))) || '';

							if (isNaN(parseInt(postIndex))) continue;
						}

						// remove garbage tag
						if (targetInfo.garbage) {
							targetInfo
								.garbage(postCount)
								.forEach(
									async (path) =>
										await page
											.waitForSelector(path)
											.then((element) => element?.evaluate((el) => el.remove()).catch(() => {}))
								);
						}
						const title =
							(await page
								.waitForSelector(targetInfo.link(postCount))
								.then((element) => element?.evaluate((el) => el.textContent?.trim()))
								.catch((err) => {
									console.log(err);
									return null;
								})) || null;
						const link =
							(await page
								.waitForSelector(targetInfo.link(postCount))
								.then((element) => element?.evaluate((el) => el.getAttribute('href')))
								.catch((err) => {
									console.log(err);
									return 'error link';
								})) || null;

						const author =
							(await page
								.waitForSelector(targetInfo.author(postCount))
								.then((element) => element?.evaluate((el) => el.textContent?.trim()))
								.catch((err) => {
									console.log(err);
									return 'error author';
								})) || null;

						const hit =
							(await page
								.waitForSelector(targetInfo.hit(postCount))
								.then((element) => element?.evaluate((el) => parseInt(el.textContent?.trim()?.replaceAll(',', '') || '0')))
								.catch((err) => {
									console.log(err);
									return -1;
								})) || null;

						if (!title && !link) return;

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
					const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });
					totalCount += count;
				}
				await page.close();
				return { count: totalCount, isError: false, message: 'good', name: targetInfo.name };
			})
	);
	return result;
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });
