import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getUsers } from '@/services/repository/user';
import ApiError from '@/utils/api-error';
import { userRoleCheck } from '@/utils/checkUserRole';
import sendError from '@/utils/send-error';

export const GET = async (req: NextRequest) => {
  try {
    const currentUser = await getUserDetails();

    if (!currentUser || !userRoleCheck.isAdmin(currentUser.role)) {
      throw new ApiError(403, 'Unauthorized to view users');
    }

    const limitParam = req.nextUrl.searchParams.get('limit');

    const limit = limitParam ? Number(limitParam) : undefined;

    const users = await getUsers(limit);

    return NextResponse.json(new ApiResponse(200, 'Users fetched successfully', users), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch users');
  }
};
