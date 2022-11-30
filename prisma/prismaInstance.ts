import { PrismaClient } from '@prisma/client';

export const _prisma = new PrismaClient();

_prisma.$on('beforeExit', async () => {
	console.log('prisma connection this connected ');
});
