import type { fresh_post } from '@prisma/client';
import { _prisma } from 'prisma/prismaInstance';

export declare type OrderBy = 'desc' | 'asc';

type GetFreshPostArgs = {
	offset?: number;
	limit?: number;
	orderByHit?: 'desc' | 'asc';
	searchText: string;
};

export declare type GetFreshPostReturn = {
	totalCount: number;
	list: fresh_post[];
};

export const getFreshPostCount = async () => {
	const [totalPostCount, topPosts] = await _prisma.$transaction([
		_prisma.fresh_post.count({
			where: {
				mark: true,
			},
		}),
		_prisma.fresh_post.findMany({
			where: { mark: true },
			skip: 0,
			take: 10,
			orderBy: { hit: 'desc' },
		}),
	]);
	return { totalPostCount, topPosts };
};

export const getFreshPost = async ({ offset, limit, orderByHit = 'desc', searchText }: GetFreshPostArgs): Promise<GetFreshPostReturn> => {
	const [totalCount, list] = await _prisma.$transaction([
		_prisma.fresh_post.count({
			where: {
				mark: true,
				title: { contains: searchText },
			},
			orderBy: { hit: orderByHit },
		}),
		_prisma.fresh_post.findMany({
			where: { mark: true, title: { contains: searchText } },
			skip: offset,
			take: limit,
			orderBy: { hit: orderByHit },
		}),
	]);

	return { totalCount, list };
};
