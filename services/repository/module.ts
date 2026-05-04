import { prisma } from '@/utils/prisma-client';

export const getLastModuleCount = async ({ courseId }: { courseId: string }) => {
  const lastModuleCount = await prisma.module.findFirst({
    where: { courseId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });

  return lastModuleCount?.order || 1;
};

export const createModule = async ({ title, courseId }: { title: string; courseId: string }) => {
  const moduleCount = await getLastModuleCount({ courseId });

  const createdModule = await prisma.module.create({
    data: { title, courseId, order: moduleCount + 1 },
  });

  return createdModule;
};

export const updateModule = async ({ title, moduleId }: { title: string; moduleId: string }) => {
  const updatedModule = await prisma.module.update({
    where: { id: moduleId },
    data: { title },
  });

  return updatedModule;
};

export const getModuleById = async ({
  moduleId,
  includeLessons,
  includeAssignments,
}: {
  moduleId: string;
  includeLessons?: boolean;
  includeAssignments?: boolean;
}) => {
  const foundModule = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      lessons: includeLessons ? { select: { id: true, title: true, content: true } } : false,
      assignments: includeAssignments
        ? { select: { id: true, title: true, description: true } }
        : false,
    },
  });

  return foundModule;
};

export const deleteModule = async ({ moduleId }: { moduleId: string }) => {
  const deletedModule = await prisma.module.delete({
    where: { id: moduleId },
  });

  return deletedModule;
};
