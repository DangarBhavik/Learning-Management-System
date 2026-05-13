import getUserDetails from '@/lib/isAuth';
import { assignCoursesToUser } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import ApiResponse from '@/utils/api-response';
import { userRoleCheck } from '@/utils/checkUserRole';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const body = await req.json();
    const { courseIds, userId }: { courseIds: string[]; userId: string } = body;

    if (!userId || courseIds.length === 0) {
      return NextResponse.json(new ApiResponse(400, 'Invalid payload', {}), { status: 400 });
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      return NextResponse.json(new ApiResponse(404, 'User not found', {}), { status: 404 });
    }

    if (userRoleCheck.isMentor(user.role) && !userRoleCheck.isTrainee(selectedUser.role)) {
      return NextResponse.json(new ApiResponse(401, 'Mentor can assign only to trainees', {}), {
        status: 401,
      });
    }

    if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
      const mentorId = await getTraineeMentorId(userId);

      if (mentorId !== user.id) {
        return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
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
    console.error(error);

    return NextResponse.json(new ApiResponse(500, 'Internal Server Error', {}), { status: 500 });
  }
};
