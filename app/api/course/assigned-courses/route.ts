import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import { getFormattedAssignedCourses } from '@/services/repository/course';
import { userRoleCheck } from '@/utils/checkUserRole';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get('userId');
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    const page = Number(searchParams.get('page'));
    let skip = 0;
    if (page && page > 1) {
      skip = (page - 1) * limit;
    }

    if (!userId) {
      throw new ApiError(400, 'userId required');
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      throw new ApiError(404, 'User not found');
    }

    if (selectedUser.id !== user.id) {
      if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
        const mentorId = await getTraineeMentorId(userId);

        if (mentorId !== user.id) {
          throw new ApiError(403, 'Not authorized to view assigned courses for this trainee');
        }
      }
    }

    const formattedCourses = await getFormattedAssignedCourses({
      userId,
      limit,
      skip,
      page,
      search,
    });

    return NextResponse.json(new ApiResponse(200, 'Assigned courses fetched', formattedCourses));
  } catch (error) {
    console.error(error);

    return sendError(error, 'Failed to fetch assigned courses');
  }
};
