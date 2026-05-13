import getUserDetails from '@/lib/isAuth';
import { restrictCoursesForTrainee } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import ApiResponse from '@/utils/api-response';
import { userRoleCheck } from '@/utils/checkUserRole';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  try {
    const { courseIds, userId } = await req.json();

    const user = await getUserDetails();

    if (!userId || !courseIds?.length) {
      return NextResponse.json(new ApiResponse(400, 'Invalid payload', {}), { status: 400 });
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      return NextResponse.json(new ApiResponse(404, 'User not found', {}), { status: 404 });
    }

    if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
      const mentorId = await getTraineeMentorId(userId);

      if (mentorId !== user.id) {
        return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
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
    console.error(error);

    return NextResponse.json(new ApiResponse(500, 'Internal Server Error', {}), { status: 500 });
  }
};
