import { ILBE_INFO } from 'lib/crawl/targetInfo';
import { puppeteerUserAgent } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';
import { Browser } from 'puppeteer';

type AccessorTemplateArgs = {
	browser: Browser;
};

export const accessorTemplate = async ({
	browser,
}: AccessorTemplateArgs): Promise<{ count: number; isError: boolean; name: string; message: string }> => {
	let totalCount = 0;

	const page = await browser.newPage();
	await page.setUserAgent(puppeteerUserAgent);

	for (let pageCount = ILBE_INFO.pageRange[0]; pageCount <= ILBE_INFO.pageRange[1]; pageCount += ILBE_INFO.pageRange[2]) {
		const tempHolder = [];
		await page.goto(ILBE_INFO.targetUrl(pageCount));

		for (let postCount = ILBE_INFO.postRange[0]; postCount <= ILBE_INFO.postRange[1]; postCount += ILBE_INFO.postRange[2]) {
			const title =
				(await page
					.waitForSelector(ILBE_INFO.link(postCount))
					.then((element) => element?.evaluate((el) => el.textContent?.trim()))
					.catch((err) => {
						console.log(err);
						return 'error title';
					})) || null;
			const link =
				(await page
					.waitForSelector(ILBE_INFO.link(postCount))
					.then((element) => element?.evaluate((el) => el.getAttribute('href')))
					.catch((err) => {
						console.log(err);
						return 'error link';
					})) || null;

			const author =
				(await page
					.waitForSelector(ILBE_INFO.author(postCount))
					.then((element) => element?.evaluate((el) => el.textContent?.trim()))
					.catch((err) => {
						console.log(err);
						return 'error author';
					})) || null;

			const hit =
				(await page
					.waitForSelector(ILBE_INFO.hit(postCount))
					.then((element) => element?.evaluate((el) => parseInt(el.textContent?.trim()?.replaceAll(',', '') || '0')))
					.catch((err) => {
						console.log(err);
						return -1;
					})) || null;

			if (!title && !link) continue;

			tempHolder.push({ title, link, hit, name: ILBE_INFO.name, mark: false, author, content: null });
		}
		const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });
		totalCount += count;
	}
	await page.close();
	return { count: totalCount, isError: false, message: 'good', name: ILBE_INFO.name };
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });
