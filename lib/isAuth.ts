import ApiError from '@/utils/api-error';
import { prisma } from '@/utils/prisma-client';
import { auth } from '@clerk/nextjs/server';

const getUserDetails = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  return user;
};

export default getUserDetails;
