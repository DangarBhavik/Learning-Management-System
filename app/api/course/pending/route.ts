import { NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getPendingCourses } from '@/services/repository/course';
import { userRoleCheck } from '@/utils/checkUserRole';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async () => {
  try {
    const user = await getUserDetails();

    if (!userRoleCheck.isAdmin(user.role)) {
      throw new ApiError(403, 'Unauthorized to view pending courses');
    }

    const courses = await getPendingCourses();

    return NextResponse.json(
      new ApiResponse(200, 'Pending courses fetched successfully', courses),
      {
        status: 200,
      }
    );
  } catch (error) {
    return sendError(error, 'Failed to fetch pending courses');
  }
};
