import { RULIWEB_INFO } from 'lib/crawl/targetInfo';
import { _prisma } from 'prisma/prismaInstance';
import puppeteer from 'puppeteer';

export const RULIWEBAccessor = async (): Promise<{ count: number; isError: boolean; name: string; message: string }> => {
	const browser = await puppeteer.launch({ headless: true });

	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
	);

	const tempHolder = [];

	for (let pageCount = RULIWEB_INFO.pageRange[0]; pageCount <= RULIWEB_INFO.pageRange[1]; pageCount += RULIWEB_INFO.pageRange[2]) {
		await page.goto(RULIWEB_INFO.targetUrl(pageCount));

		// await writeFile('./dummy.html', await page.content()).then(() => console.log('file wrote'));

		for (let postCount = RULIWEB_INFO.postRange[0]; postCount <= RULIWEB_INFO.postRange[1]; postCount += RULIWEB_INFO.postRange[2]) {
			await Promise.all(
				RULIWEB_INFO.garbage(postCount).map(
					async (path) => await page.waitForSelector(path).then((element) => element?.evaluate((el) => el.remove()))
				)
			);

			const title =
				(await page
					.waitForSelector(RULIWEB_INFO.title(postCount))
					.then((element) => element?.evaluate((el) => el.textContent?.trim()))) || null;

			const link =
				(await page
					.waitForSelector(RULIWEB_INFO.title(postCount))
					.then((element) => element?.evaluate((el) => el.getAttribute('href')))) || null;

			const author =
				(await page
					.waitForSelector(RULIWEB_INFO.author(postCount))
					.then((element) => element?.evaluate((el) => el.textContent?.trim()))) || null;

			const hit =
				(await page
					.waitForSelector(RULIWEB_INFO.hit(postCount))
					.then((element) => element?.evaluate((el) => parseInt(el.textContent?.trim()?.replaceAll(',', '') || '0')))) || null; // select the element

			tempHolder.push({ title, link, hit, name: RULIWEB_INFO.name, mark: false, author, content: null });
		}
	}
	await browser.close();

	const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });

	return { count, isError: false, message: 'good', name: RULIWEB_INFO.name };
};
