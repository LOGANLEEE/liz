import { _prisma } from 'prisma/prismaInstance';

export const markingFreshPosts = async () => {
	const { count } = await _prisma.fresh_post.updateMany({ data: { mark: true }, where: { mark: false } });
	return { count };
};

export const moveMarkedPosts = async () => {
	const freshes = await _prisma.fresh_post.findMany({ where: { mark: true } });
	const { count: movedCount } = await _prisma.old_post.createMany({ data: freshes });
	const { count: deletedCount } = await _prisma.fresh_post.deleteMany({ where: { mark: true } });

	return { movedCount, deletedCount };
};
