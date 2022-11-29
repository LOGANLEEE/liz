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
