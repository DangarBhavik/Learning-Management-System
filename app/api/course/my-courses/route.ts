import getUserDetails from '@/lib/isAuth';
import { getMyCourses } from '@/services/repository/course';
import ApiResponse from '@/utils/api-response';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const user = await getUserDetails();

    const courses = await getMyCourses({ userId: user.id });

    return NextResponse.json(new ApiResponse(200, 'Courses fetched successfully', courses), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
