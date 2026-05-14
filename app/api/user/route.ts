import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { NextResponse } from 'next/server';
import { getTraineesByMentor, getAllUsersForAdmin } from '@/services/repository/course';
import { User } from '@/generated/prisma/client';
import { userRoleCheck } from '@/utils/checkUserRole';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async () => {
  try {
    let user = await getUserDetails();

    if (userRoleCheck.isTrainee(user.role)) {
      throw new ApiError(403, 'Unauthorized to view users');
    }

    let users: User[] = [];

    if (userRoleCheck.isMentor(user.role)) {
      users = await getTraineesByMentor(user.id);
    }

    if (userRoleCheck.isAdmin(user.role)) {
      users = await getAllUsersForAdmin();
    }

    return NextResponse.json(new ApiResponse(200, 'Users fetched successfully', users), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch users');
  }
};
