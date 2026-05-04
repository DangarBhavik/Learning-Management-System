import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getTraineeMentorId } from '@/services/repository/user';
import { getFormattedAssignedCourses } from '@/services/repository/course';

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const searchParams = req.nextUrl.searchParams;

    const limit = Number(searchParams.get('limit')) || 3;
    const page = Number(searchParams.get('page')) || 1;
    const traineeId = searchParams.get('traineeId');
    const skip = (page - 1) * limit;

    if (!traineeId) {
      return NextResponse.json(new ApiResponse(400, 'traineeId is required', {}), { status: 400 });
    }

    const mentorId = await getTraineeMentorId(traineeId);

    if (mentorId != user.id) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const assignedCoursesData = await getFormattedAssignedCourses({ traineeId, skip, limit, page });

    console.log(assignedCoursesData);

    return NextResponse.json(
      new ApiResponse(200, 'Assigned courses fetched successfully', assignedCoursesData),
      {
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch assigned courses';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
