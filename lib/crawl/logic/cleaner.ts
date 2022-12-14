import { _prisma } from 'prisma/prismaInstance';

// export const stagePreparation = async () => {
// 	const { count } = await _prisma.fresh_post.updateMany({ data: { mark: false }, where: { mark: false } });
// 	return { count };
// };

type Args = { type: number };
export const afterStageCleanUp = async ({ type }: Args) => {
	const freshes = await _prisma.fresh_post.findMany({ where: { mark: true, type } });
	const { count: movedCount } = await _prisma.old_post.createMany({ data: freshes });
	const { count: deletedCount } = await _prisma.fresh_post.deleteMany({ where: { mark: true, type } });
	const { count: updatedCount } = await _prisma.fresh_post.updateMany({ data: { mark: true }, where: { mark: false, type } });
	return { movedCount, deletedCount, updatedCount };
};
