import { prisma } from '@/utils/prisma-client';
import { extractEmbeddedFileIds } from '@/utils/getIdsFromMarkdown';

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
  let deletedFilesFromDb: { id: string; public_id: string; type: any }[] = [];

  await prisma.$transaction(async tx => {
    const lessons = await tx.lesson.findMany({
      where: { moduleId },
      select: { id: true, content: true },
    });

    const assignments = await tx.assignment.findMany({
      where: { moduleId },
      select: { id: true, description: true },
    });

    const filesToDelete = [
      ...(lessons?.flatMap(lesson => extractEmbeddedFileIds(lesson.content)) || []),
      ...(assignments?.flatMap(assignment => extractEmbeddedFileIds(assignment.description)) || []),
    ];

    if (filesToDelete.length > 0) {
      const foundFiles = await tx.file.findMany({
        where: { id: { in: filesToDelete } },
        select: { id: true, public_id: true, type: true },
      });

      deletedFilesFromDb = foundFiles;

      if (foundFiles.length > 0) {
        await tx.file.deleteMany({ where: { id: { in: foundFiles.map(f => f.id) } } });
      }
    }

    const lessonIds = lessons.map(l => l.id);
    const assignmentIds = assignments.map(a => a.id);

    if (lessonIds.length > 0) {
      await tx.lesson.deleteMany({ where: { id: { in: lessonIds } } });
    }

    if (assignmentIds.length > 0) {
      await tx.assignment.deleteMany({ where: { id: { in: assignmentIds } } });
    }

    await tx.module.delete({ where: { id: moduleId } });
  });

  return deletedFilesFromDb;
};
