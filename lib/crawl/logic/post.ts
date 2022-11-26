import { _prisma } from 'prisma/prismaInstance';

export const getFreshPost = async () => {
	const list = await _prisma.fresh_post.findMany({ where: { mark: false }, orderBy: { hit: 'desc' } });
	return list;
};
