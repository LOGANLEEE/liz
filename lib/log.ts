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

export const getRecentAccessLog = async (): Promise<api_log | null> => {
	const recentAccessLog = await _prisma.api_log.findFirst({ where: { name: 'accessor' }, orderBy: { create_date: 'desc' } });
	return recentAccessLog;
};
