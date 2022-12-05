import type { fresh_post } from '@prisma/client';
import { _prisma } from 'prisma/prismaInstance';

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
		_prisma.fresh_post.count(),
		_prisma.fresh_post.findMany({
			where: { mark: false },
			skip: offset,
			take: limit,
			orderBy: { hit: orderByHit || undefined },
		}),
	]);

	return { totalCount, list };
};
