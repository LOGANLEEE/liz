import { FMKOREA_INFO } from 'lib/crawl/targetInfo';
import { _prisma } from 'prisma/prismaInstance';
import puppeteer from 'puppeteer';

export const accessorTemplate = async (): Promise<{ count: number; isError: boolean; name: string; message: string }> => {
	const browser = await puppeteer.launch({ headless: true });

	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
	);

	const tempHolder = [];

	for (let pageCount = FMKOREA_INFO.pageRange[0]; pageCount <= FMKOREA_INFO.pageRange[1]; pageCount += FMKOREA_INFO.pageRange[2]) {
		await page.goto(FMKOREA_INFO.targetUrl(pageCount));

		for (let postCount = FMKOREA_INFO.postRage[0]; postCount <= FMKOREA_INFO.postRage[1]; postCount += FMKOREA_INFO.postRage[2]) {
			const title =
				(await page
					.waitForSelector(FMKOREA_INFO.link(postCount))
					.then((element) => element?.evaluate((el) => el.textContent?.trim()))) || null; // select the element
			const link =
				(await page
					.waitForSelector(FMKOREA_INFO.link(postCount))
					.then((element) => element?.evaluate((el) => el.getAttribute('href')))) || null; // select the element

			const author =
				(await page
					.waitForSelector(FMKOREA_INFO.author(postCount))
					.then((element) => element?.evaluate((el) => el.getAttribute('href')))) || null; // select the element

			const hit =
				(await page
					.waitForSelector(FMKOREA_INFO.author(postCount))
					.then((element) => element?.evaluate((el) => parseInt(el.textContent?.trim()?.replaceAll(',', '') || '0')))) || null; // select the element

			tempHolder.push({ title, link, hit, name: FMKOREA_INFO.name, mark: false, author, content: null });
		}
	}
	await browser.close();

	const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });

	return { count, isError: false, message: 'good', name: FMKOREA_INFO.name };
};

// await writeFile('./dummy.html', await newPage.content()).then(() => {
// 	console.log('file write.');
// });