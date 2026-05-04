import { prisma } from '@/utils/prisma-client';

export const getLessonById = async ({ lessonId }: { lessonId: string }) => {
  const lessonDetails = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  return lessonDetails;
};

export const createLesson = async ({
  title,
  content,
  moduleId,
}: {
  title: string;
  content: string;
  moduleId: string;
}) => {
  const lastLessonOrder = await getLastLessonOrder({ moduleId });

  const createdLesson = await prisma.lesson.create({
    data: { title, content, moduleId, order: lastLessonOrder + 1 },
  });

  return createdLesson;
};

export const deleteLesson = async ({ lessonId }: { lessonId: string }) => {
  const deletedLesson = await prisma.lesson.delete({
    where: { id: lessonId },
    select: { id: true },
  });

  return deletedLesson;
};

export const updateLesson = async ({
  title,
  content,
  lessonId,
}: {
  title?: string;
  content?: string;
  lessonId: string;
}) => {
  const updatedLesson = await prisma.lesson.update({
    where: { id: lessonId },
    data: { title, content },
  });

  return updatedLesson;
};

export const getLastLessonOrder = async ({ moduleId }: { moduleId: string }) => {
  const lastLesson = await prisma.lesson.findFirst({
    where: {
      moduleId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastLesson?.order || 1;
};
