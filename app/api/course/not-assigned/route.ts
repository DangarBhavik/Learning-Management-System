import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import { getAssignableCourses, getAssignableCoursesCount } from '@/services/repository/course';
import { userRoleCheck } from '@/utils/checkUserRole';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();
    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get('userId');

    const limit = Number(searchParams.get('limit')) || 3;
    const page = Number(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    if (!userId) {
      throw new ApiError(400, 'userId required');
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      throw new ApiError(404, 'User not found');
    }

    if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
      const mentorId = await getTraineeMentorId(userId);

      if (mentorId !== user.id) {
        throw new ApiError(403, 'Not authorized to view assignable courses for this trainee');
      }
    }

    const totalCourses = await getAssignableCoursesCount({ userId });

    const formattedCourses = await getAssignableCourses({ userId, limit, skip });

    return NextResponse.json(
      new ApiResponse(200, 'Assignable courses fetched', {
        courses: formattedCourses,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCourses / limit),
          hasNextPage: page * limit < totalCourses,
          hasPreviousPage: page > 1,
        },
      })
    );
  } catch (error) {
    return sendError(error, 'Failed to fetch assignable courses');
  }
};
