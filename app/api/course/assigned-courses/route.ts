import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getTraineeMentorId, getUserById } from '@/services/repository/user';
import { getAssignedCourses, getAssignedCoursesCount } from '@/services/repository/course';
import { userRoleCheck } from '@/utils/checkUserRole';

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get('userId');
    const limit = Number(searchParams.get('limit'));
    const page = Number(searchParams.get('page'));
    let skip = 0;
    if (typeof limit === 'number') {
      skip = (page - 1) * limit;
    }

    if (!userId) {
      return NextResponse.json(new ApiResponse(400, 'userId required', {}), { status: 400 });
    }

    const selectedUser = await getUserById(userId);

    if (!selectedUser) {
      return NextResponse.json(new ApiResponse(404, 'User not found', {}), { status: 404 });
    }

    if (selectedUser.id !== user.id) {
      if (userRoleCheck.isMentor(user.role) && userRoleCheck.isTrainee(selectedUser.role)) {
        const mentorId = await getTraineeMentorId(userId);

        if (mentorId !== user.id) {
          return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
        }
      }
    }

    const totalCourses = await getAssignedCoursesCount({
      userId,
    });

    const formattedCourses = await getAssignedCourses({
      userId,
      limit,
      skip,
    });

    return NextResponse.json(
      new ApiResponse(200, 'Assigned courses fetched', {
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
    console.error(error);

    return NextResponse.json(new ApiResponse(500, 'Internal Server Error', {}), { status: 500 });
  }
};
