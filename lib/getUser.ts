import { prisma } from '@/utils/prisma-client';

const getUser = async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
};

export default getUser;
