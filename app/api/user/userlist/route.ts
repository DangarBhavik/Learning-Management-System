import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { getUsers } from '@/services/repository/user';

export const GET = async (req: NextRequest) => {
  try {
    const currentUser = await getUserDetails();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(new ApiResponse(403, 'Forbidden', null), {
        status: 403,
      });
    }

    const limitParam = req.nextUrl.searchParams.get('limit');

    const limit = limitParam ? Number(limitParam) : undefined;

    const users = await getUsers(limit);

    return NextResponse.json(new ApiResponse(200, 'Users fetched successfully', users), {
      status: 200,
    });
  } catch (error) {
    console.error('GET USERS ERROR:', error);

    return NextResponse.json(new ApiResponse(500, 'Internal Server Error', null), {
      status: 500,
    });
  }
};
