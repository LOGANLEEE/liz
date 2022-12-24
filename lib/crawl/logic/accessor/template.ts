import { writeFile } from 'fs/promises';
import { INVEN_INFO } from 'lib/crawl/targetSiteInfo';
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

	for (let pageCount = INVEN_INFO.pageRange[0]; pageCount <= INVEN_INFO.pageRange[1]; pageCount += INVEN_INFO.pageRange[2]) {
		console.log(`===> ${INVEN_INFO.name} ${pageCount} / ${INVEN_INFO.pageRange[1]}`);
		const tempHolder = [];
		await page.goto(INVEN_INFO.targetUrl(pageCount));
		if (pageCount === 1) {
			await writeFile('./dummy.html', await page.content()).then(() => {
				console.log('html write.');
			});
			await writeFile('./dummy.png', await page.screenshot()).then(() => {
				console.log('png write.');
			});
		}

		for (let postCount = INVEN_INFO.postRange[0]; postCount <= INVEN_INFO.postRange[1]; postCount += INVEN_INFO.postRange[2]) {
			if (INVEN_INFO.garbage) {
				INVEN_INFO.garbage(postCount).forEach(
					async (path) =>
						await page.waitForSelector(path).then((element) => element?.evaluate((el) => el.remove()).catch(() => {}))
				);
			}

			const title = await page
				.waitForSelector(INVEN_INFO?.title ? INVEN_INFO?.title(postCount) : INVEN_INFO.link(postCount))
				.then((element) => element?.evaluate((el) => el.textContent?.trim()))
				.catch(() => null);

			const link = await page
				.waitForSelector(INVEN_INFO.link(postCount))
				.then((element) => element?.evaluate((el) => el.getAttribute('href')))
				.catch(() => null);

			const author = await page
				.waitForSelector(INVEN_INFO.author(postCount))
				.then((element) => element?.evaluate((el) => el.textContent?.trim()))
				.catch(() => '::author::');

			const hit = await page
				.waitForSelector(INVEN_INFO.hit(postCount))
				.then((element) =>
					element?.evaluate((el) =>
						parseInt(
							el.textContent?.trim()?.replaceAll(' ', '')?.replaceAll(',', '')?.replaceAll('.', '')?.replaceAll('k', '00') ||
								'-1'
						)
					)
				)
				.catch(() => -1);

			if (!title && !link) continue;

			tempHolder.push({
				title,
				link: `${INVEN_INFO.targetBaseName}${link}`,
				hit,
				name: INVEN_INFO.name,
				mark: false,
				author,
				content: null,
			});
		}
		const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });
		totalCount += count;
	}
	await page.close();
	return { count: totalCount, isError: false, message: 'good', name: INVEN_INFO.name };
};
