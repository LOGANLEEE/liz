import { _prisma } from 'prisma/prismaInstance';

type TemplateArgs = {
	name?: string;
	body?: string;
	result: number;
};

export const template = async (args: TemplateArgs) => {
	await _prisma.api_log.findFirst({});
	return;
};
