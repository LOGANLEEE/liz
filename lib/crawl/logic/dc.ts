import { JSDOM } from 'jsdom';
import { delay, _axios } from '../../util';
import { names, targetInfo } from '../targetInfo';

export const accessor = async () => {
	// get target Info
	const { author, hit, link, name, page, range, rangeGap, targetUrl, targetIndex } = targetInfo.filter(
		({ name }) => name === names.dc
	)[0];
	const tempHolder = [];

	for (let pageCount = page[0]; pageCount <= page[1]; pageCount += 1) {
		await delay(pageCount * 500);
		const { data, error } = await _axios.get(targetUrl(pageCount)).catch((error) => error);

		if (!error && data) {
			const fragment = JSDOM.fragment(data);
			for (let idx = range[0]; idx <= range[1]; idx += rangeGap) {
				const postIndex = fragment.querySelector(targetIndex(idx))?.textContent || 'null';

				if (isNaN(parseInt(postIndex))) continue;

				const _link = fragment.querySelector(link(idx))?.getAttribute('href');
				const _author = fragment.querySelector(author(idx))?.getAttribute('title');
				const _hit = fragment.querySelector(hit(idx))?.textContent;
				tempHolder.push({ postIndex, _link, _author, _hit });
			}
		}
	}

	// targetURLs.map(async ({ targetName, targetUrl: url }) => {
	// const test = await JSDOM.fromURL(url, {}).then((dom) => {
	// 	return dom.serialize();
	// });
	// 	const { data, error } = await _axios.get(url).catch((error) => error);
	// 	if (!error && data) {
	// 		const fragment = JSDOM.fragment(data);
	// 		return targetInfo
	// 			.filter(({ name }) => name === targetName)
	// 			.map(({ author, hit, link, name, page, range, rangeGap }) => {
	// 				const tempHolder = [];
	// 				for (let idx = range[0]; idx <= range[1]; idx += rangeGap) {
	// 					const _link = fragment.querySelector(link(idx))?.getAttribute('href');
	// 					const _author = fragment.querySelector(author(idx))?.getAttribute('title');
	// 					const _hit = fragment.querySelector(hit(idx));
	// 					tempHolder.push({ _link, _author, _hit });
	// 					return tempHolder;
	// 				}
	// 			});
	// 	}
	// })
	// );

	return { data: tempHolder };
};
