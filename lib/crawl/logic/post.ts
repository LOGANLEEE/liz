import { _prisma } from 'prisma/prismaInstance';

type GetFreshPostArgs = {
	offset?: number;
	limit?: number;
};
export const getFreshPost = async ({ offset, limit }: GetFreshPostArgs) => {
	const [totalCount, list] = await _prisma.$transaction([
		_prisma.fresh_post.count(),
		_prisma.fresh_post.findMany({
			where: { mark: false },
			skip: offset,
			take: limit,
		}),
	]);

	return { totalCount, list };
};
