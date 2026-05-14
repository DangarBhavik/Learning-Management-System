import getUserDetails from '@/lib/isAuth';
import { restrictCoursesForTrainee } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { userRoleCheck } from '@/utils/checkUserRole';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  try {
    const { courseIds, userId } = await req.json();

    const user = await getUserDetails();

    if (!userId || (courseIds && courseIds.length === 0)) {
      throw new ApiError(400, 'Invalid payload');
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      throw new ApiError(404, 'User not found');
    }

    if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
      const mentorId = await getTraineeMentorId(userId);

      if (mentorId !== user.id) {
        throw new ApiError(403, 'Unauthorized to restrict courses for this trainee');
      }
    }

    const deleteEnrollment = await restrictCoursesForTrainee({
      courseIds,
      userId: selectedUser.id,
    });

    await createNotification({
      userId: selectedUser.id,
      message: `Some courses have been restricted for you.`,
      link: `/app/courses`,
    });

    return NextResponse.json(
      new ApiResponse(200, 'Courses restricted successfully', deleteEnrollment)
    );
  } catch (error) {
    return sendError(error, 'Failed to restrict courses');
  }
};
