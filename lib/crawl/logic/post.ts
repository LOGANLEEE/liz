import type { fresh_post } from '@prisma/client';
import { _prisma } from 'prisma/prismaInstance';

export declare type OrderBy = 'desc' | 'asc';

type GetFreshPostArgs = {
	offset?: number;
	limit?: number;
	orderByHit?: 'desc' | 'asc';
};

export declare type GetFreshPostReturn = {
	totalCount: number;
	list: fresh_post[];
};

export const getFreshPost = async ({ offset, limit, orderByHit }: GetFreshPostArgs): Promise<GetFreshPostReturn> => {
	const [totalCount, list] = await _prisma.$transaction([
		_prisma.fresh_post.count({ where: { mark: true } }),
		_prisma.fresh_post.findMany({
			where: { mark: true },
			skip: offset,
			take: limit,
			orderBy: { hit: orderByHit || undefined },
		}),
	]);

	return { totalCount, list };
};
