import { FMKOREA_INFO } from 'lib/crawl/targetInfo';
import { delay, puppeteerArgs } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';
import puppeteer from 'puppeteer';

export const FMKOREAaccessor = async (): Promise<{ count: number; isError: boolean; name: string; message: string }> => {
	try {
		const browser = await puppeteer.launch({ headless: true, args: puppeteerArgs });

		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
		);

		const tempHolder = [];

		for (let pageCount = FMKOREA_INFO.pageRange[0]; pageCount <= FMKOREA_INFO.pageRange[1]; pageCount += FMKOREA_INFO.pageRange[2]) {
			await delay(pageCount * 500);
			await page.goto(FMKOREA_INFO.targetUrl(pageCount));

			for (
				let postCount = FMKOREA_INFO.postRange[0];
				postCount <= FMKOREA_INFO.postRange[1];
				postCount += FMKOREA_INFO.postRange[2]
			) {
				const title =
					(await page.waitForSelector(FMKOREA_INFO.link(postCount)).then((el) => el?.evaluate((el) => el.textContent?.trim()))) ||
					null;

				const link =
					(await page
						.waitForSelector(FMKOREA_INFO.link(postCount))
						.then((el) => el?.evaluate((el) => el.getAttribute('href')))) || null;

				const author =
					(await page
						.waitForSelector(FMKOREA_INFO.author(postCount))
						.then((el) => el?.evaluate((el) => el.textContent?.trim()))) || null;

				const hit = await page
					.waitForSelector(FMKOREA_INFO.hit(postCount))
					.then((el) => el?.evaluate((el) => parseInt(el.textContent?.trim() || '-1')));

				tempHolder.push({
					title,
					link: `${FMKOREA_INFO.targetBaseName}${link}`,
					hit,
					name: FMKOREA_INFO.name,
					mark: false,
					author,
					content: null,
				});
			}
		}
		await browser.close();

		const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });

		return { count, isError: false, message: 'good', name: FMKOREA_INFO.name };
	} catch (error) {
		return { count: 0, isError: true, message: JSON.stringify(error), name: FMKOREA_INFO.name };
	}
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });
