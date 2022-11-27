import { JSDOM } from 'jsdom';
import { _axios } from 'lib/axiosInstance';
import { DCINSIDE_INFO } from 'lib/crawl/targetInfo';
import { delay, masking } from 'lib/util';
import { _prisma } from 'prisma/prismaInstance';

export const DCINSIDEAccessor = async (): Promise<{ count: number; isError: boolean; name: string; message: string }> => {
	// get target Info
	const { author, hit, link, name, page, range, rangeGap, targetUrl, targetIndex, garbage, targetHostName } = DCINSIDE_INFO;

	const tempHolder = [];

	for (let pageCount = page[0]; pageCount <= page[1]; pageCount += 1) {
		await delay(pageCount * 500);
		const { data, error } = await _axios.get(targetUrl(pageCount)).catch((error) => error);

		if (!error && data) {
			const fragment = JSDOM.fragment(data);
			for (let idx = range[0]; idx <= range[1]; idx += rangeGap) {
				// remove garbage tag
				garbage(idx).forEach((target) => {
					fragment.querySelector(target)?.remove();
				});

				const postIndex = fragment.querySelector(targetIndex(idx))?.textContent || 'null';

				if (isNaN(parseInt(postIndex))) continue;

				const _title = fragment.querySelector(link(idx))?.textContent || masking;
				if (_title === masking) return { count: 0, isError: true, name, message: 'empty title' };

				const _link = fragment.querySelector(link(idx))?.getAttribute('href') || masking;
				if (_link === masking) return { count: 0, isError: true, name, message: 'empty link' };

				const _hit = parseInt(fragment.querySelector(hit(idx))?.textContent || '---');
				if (isNaN(_hit)) return { count: 0, isError: true, name, message: 'empty hit' };

				const _author = fragment.querySelector(author(idx))?.getAttribute('title') || masking;
				if (_author === masking) return { count: 0, isError: true, name, message: 'empty author' };

				tempHolder.push({ link: `${targetHostName}${_link}`, author: _author, hit: _hit, name, title: _title, mark: false });
			}
		}
	}
	if (tempHolder.length < 1) return { count: 0, isError: true, name, message: 'tempHolder is empty' };

	const { count } = await _prisma.fresh_post.createMany({ data: tempHolder });
	return { count, isError: false, message: '', name };
};
