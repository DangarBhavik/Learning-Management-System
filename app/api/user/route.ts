import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { NextResponse } from 'next/server';
import { getTraineesByMentor, getAllUsersForAdmin } from '@/services/repository/course';
import { User } from '@/generated/prisma/client';

export const GET = async () => {
  try {
    let user;

    try {
      user = await getUserDetails();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please login first';

      return NextResponse.json(new ApiResponse(401, message, {}), { status: 401 });
    }

    if (user.role === 'TRAINEE') {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    let users: User[] = [];

    if (user.role === 'MENTOR') {
      users = await getTraineesByMentor(user.id);
    }

    if (user.role === 'ADMIN') {
      users = await getAllUsersForAdmin();
    }

    return NextResponse.json(new ApiResponse(200, 'Users fetched successfully', users), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(new ApiResponse(500, 'Internal Server Error', {}), { status: 500 });
  }
};
