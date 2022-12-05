import { writeFile } from 'fs/promises';
import { DCINSIDE_INFO } from 'lib/crawl/targetInfo';
import { delay, masking } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';
import puppeteer from 'puppeteer';

export const DCINSIDEAccessor = async (): Promise<{ count: number; isError: boolean; name: string; message: string }> => {
	// get target Info

	const browser = await puppeteer.launch({ headless: true });

	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
	);
	const tempHolder = [];

	for (let pageCount = DCINSIDE_INFO.pageRange[0]; pageCount <= DCINSIDE_INFO.pageRange[1]; pageCount += DCINSIDE_INFO.pageRange[2]) {
		await page.goto(DCINSIDE_INFO.targetUrl(pageCount));
		await delay(pageCount * 500);

		// await writeFile('./dummy.html', await page.content()).then(() => console.log('file wrote'));

		for (let postCount = DCINSIDE_INFO.postRange[0]; postCount <= DCINSIDE_INFO.postRange[1]; postCount += DCINSIDE_INFO.postRange[2]) {
			const postIndex =
				(await page
					.waitForSelector(DCINSIDE_INFO.targetIndex(postCount))
					.then((element) => element?.evaluate((el) => el?.textContent?.trim()))) || '';

			if (isNaN(parseInt(postIndex))) continue;

			// remove garbage tag
			DCINSIDE_INFO.garbage(postCount).forEach(
				async (path) => await page.waitForSelector(path).then((element) => element?.evaluate((el) => el.remove()))
			);

			const title =
				(await page
					.waitForSelector(DCINSIDE_INFO.link(postCount))
					.then((element) => element?.evaluate((el) => el?.textContent?.trim()))) || masking;
			if (title === masking) return { count: 0, isError: true, name: DCINSIDE_INFO.name, message: 'empty title' };

			const link =
				(await page
					.waitForSelector(DCINSIDE_INFO.link(postCount))
					.then((element) => element?.evaluate((el) => el?.getAttribute('href')))) || masking;
			if (link === masking) return { count: 0, isError: true, name: DCINSIDE_INFO.name, message: 'empty link' };

			const hit = parseInt(
				(await page.waitForSelector(DCINSIDE_INFO.hit(postCount)).then((element) => element?.evaluate((el) => el?.textContent))) ||
					'---'
			);
			if (isNaN(hit)) return { count: 0, isError: true, name: DCINSIDE_INFO.name, message: 'empty hit' };

			const author =
				(await page
					.waitForSelector(DCINSIDE_INFO.author(postCount))
					?.then((element) => element?.evaluate((el) => el?.getAttribute('title')))) || masking;
			if (author === masking) return { count: 0, isError: true, name: DCINSIDE_INFO.name, message: 'empty author' };

			tempHolder.push({
				link: `${DCINSIDE_INFO.targetHostName}${link}`,
				author,
				hit,
				name: DCINSIDE_INFO.name,
				title: title,
				mark: false,
			});
		}
	}
	if (tempHolder.length < 1) return { count: 0, isError: true, name: DCINSIDE_INFO.name, message: 'tempHolder is empty' };

	const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });
	return { count, isError: false, message: '', name: DCINSIDE_INFO.name };
};
