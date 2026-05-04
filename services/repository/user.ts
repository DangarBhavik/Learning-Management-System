import { prisma } from '@/utils/prisma-client';

export const getTraineeMentor = async (traineeId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: traineeId },
    select: {
      mentor: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });

  return user?.mentor;
};

export const getTraineeMentorId = async (traineeId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: traineeId },
    select: {
      mentorId: true,
    },
  });

  return user?.mentorId;
};
