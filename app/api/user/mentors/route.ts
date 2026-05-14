import { NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getAllMentors } from '@/services/repository/user';
import ApiError from '@/utils/api-error';
import { userRoleCheck } from '@/utils/checkUserRole';
import sendError from '@/utils/send-error';

export const GET = async () => {
  try {
    const currentUser = await getUserDetails();

    if (!currentUser || !userRoleCheck.isAdmin(currentUser.role)) {
      throw new ApiError(403, 'Unauthorized to view users');
    }

    const mentors = await getAllMentors();

    return NextResponse.json(new ApiResponse(200, 'Mentors fetched successfully', mentors), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch mentors');
  }
};
