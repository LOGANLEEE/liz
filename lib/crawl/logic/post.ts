import type { fresh_post } from '@prisma/client';
import { names } from 'lib/crawl/targetInfo';
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

type AnalyzeQueryProps = {
	searchText?: string;
};
export const analyzeQuery = async ({ searchText }: AnalyzeQueryProps) => {
	return Promise.all(
		Object.values(names).map(async (name) => {
			const { _avg, _count, _max, _min, _sum } = await _prisma.fresh_post.aggregate({
				_min: {
					hit: true,
				},
				_max: {
					hit: true,
				},
				_avg: {
					hit: true,
				},
				_count: {
					_all: true,
				},
				_sum: {
					hit: true,
				},
				where: { mark: true, name, title: { contains: searchText } },
			});
			return { avg: _avg.hit, count: _count._all, max: _max.hit, min: _min.hit, sum: _sum.hit, name };
		})
	);
};
export const visualizeQuery = async () => {
	return Promise.all(
		Object.values(names).map(async (name) => {
			const { _avg, _count, _max, _min, _sum } = await _prisma.fresh_post.aggregate({
				_min: {
					hit: true,
				},
				_max: {
					hit: true,
				},
				_avg: {
					hit: true,
				},
				_count: {
					_all: true,
				},
				_sum: {
					hit: true,
				},
				where: { mark: true, name },
			});
			return { avg: _avg.hit, count: _count._all, max: _max.hit, min: _min.hit, sum: _sum.hit, name };
		})
	);
};

export const getFreshPostCountQuery = async () => {
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

export const getFreshPostQuery = async ({
	offset,
	limit,
	orderByHit = 'desc',
	searchText,
}: GetFreshPostArgs): Promise<GetFreshPostReturn> => {
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
