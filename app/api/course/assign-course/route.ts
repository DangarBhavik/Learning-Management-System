import getUserDetails from '@/lib/isAuth';
import { assignCoursesToUser } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { userRoleCheck } from '@/utils/checkUserRole';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const body = await req.json();
    const { courseIds, userId }: { courseIds: string[]; userId: string } = body;

    if (!userId || courseIds.length === 0) {
      throw new ApiError(400, 'Invalid payload');
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      throw new ApiError(404, 'User not found');
    }

    if (userRoleCheck.isMentor(user.role) && !userRoleCheck.isTrainee(selectedUser.role)) {
      throw new ApiError(401, 'Mentor can assign only to trainees');
    }

    if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
      const mentorId = await getTraineeMentorId(userId);

      if (mentorId !== user.id) {
        throw new ApiError(403, 'Not authorized to assign courses to this trainee');
      }
    }

    const assignedCourses = await assignCoursesToUser({
      courseIds,
      userId,
    });

    await createNotification({
      userId: selectedUser.id,
      message: `You have been assigned new courses.`,
      link: `/app/courses`,
    });

    return NextResponse.json(
      new ApiResponse(200, 'Courses assigned successfully', assignedCourses)
    );
  } catch (error) {
    return sendError(error, 'Failed to assign courses to user');
  }
};
