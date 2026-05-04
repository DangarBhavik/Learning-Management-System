import { getCourseAuthorId } from '@/services/repository/course';
export const checkCourseCrudAccess = async ({
  courseId,
  user,
}: {
  courseId: string;
  user: { id: string; role: string };
}) => {
  const authorId = await getCourseAuthorId({ courseId });

  return authorId === user.id || user.role === 'ADMIN';
};
