import type { api_log } from '@prisma/client';
import { _prisma } from 'prisma/prismaInstance';

type WriteLogArgs = {
	name?: string;
	body?: string;
	result: number;
};

export const writeLog = async (args: WriteLogArgs) => {
	await _prisma.api_log.create({ data: args });
	return;
};

export const getRecentAccessLogQuery = async (): Promise<{ recentAccessLog: api_log | null; totalPostCount: number }> => {
	const [recentAccessLog, totalPostCount] = await _prisma.$transaction([
		_prisma.api_log.findFirst({ where: { name: 'accessor' }, orderBy: { create_date: 'desc' } }),
		_prisma.fresh_post.count({ where: { mark: true } }),
	]);
	return { recentAccessLog, totalPostCount };
};
