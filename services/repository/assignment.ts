import { getCourseAuthorId } from '@/services/repository/course';
import { prisma } from '@/utils/prisma-client';

export const createAssignment = async ({
  title,
  description,
  maxScore,
  moduleId,
  userId,
}: {
  title: string;
  description: string;
  maxScore: number;
  moduleId: string;
  userId: string;
}) => {
  const createdAssignment = await prisma.assignment.create({
    data: { title, description, maxScore, moduleId, createdById: userId },
  });

  return createdAssignment;
};

export const getAssignmentById = async ({ assignmentId }: { assignmentId: string }) => {
  const lessonDetails = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      maxScore: true,
    },
  });

  return lessonDetails;
};

export const deleteAssignment = async ({ assignmentId }: { assignmentId: string }) => {
  const deletedAssignment = await prisma.assignment.delete({
    where: { id: assignmentId },
  });

  return deletedAssignment;
};

export const updateAssignment = async ({
  assignmentId,
  data,
}: {
  assignmentId: string;
  data: {
    title?: string;
    description?: string;
    maxScore?: number;
    dueDate?: Date | null;
  };
}) => {
  const updatedAssignment = await prisma.assignment.update({
    where: { id: assignmentId },
    data,
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      maxScore: true,
      moduleId: true,
    },
  });

  return updatedAssignment;
};
