import getUserDetails from '@/lib/isAuth';
import { restrictCoursesForTrainee } from '@/services/repository/course';
import { getTraineeMentorId } from '@/services/repository/user';
import ApiResponse from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    if (user.role !== 'MENTOR') {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const body = await req.json();

    const { courseIds, traineeId }: { courseIds: string[]; traineeId: string } = body;

    const mentorId = await getTraineeMentorId(traineeId);

    if (mentorId != user.id) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    await restrictCoursesForTrainee({ traineeId, courseIds });

    return NextResponse.json(new ApiResponse(201, 'Courses restricted successfully', {}), {
      status: 201,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(new ApiResponse(401, errorMessage || 'Error', {}), {
      status: 401,
    });
  }
};
