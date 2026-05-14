import { getCourseAuthorId } from '@/services/repository/course';
import { userRoleCheck } from './checkUserRole';
import { PrismaUserRole } from '@/types/user';
export const checkCourseCrudAccess = async ({
  courseId,
  user,
}: {
  courseId: string;
  user: { id: string; role: PrismaUserRole };
}) => {
  const authorId = await getCourseAuthorId({ courseId });
  return authorId === user.id || userRoleCheck.isAdmin(user.role);
};
