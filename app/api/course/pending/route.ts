import { NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getPendingCourses } from '@/services/repository/course';

export const GET = async () => {
  try {
    const user = await getUserDetails();

    if (user.role !== 'ADMIN') {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const courses = await getPendingCourses();

    return NextResponse.json(
      new ApiResponse(200, 'Pending courses fetched successfully', courses),
      {
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
