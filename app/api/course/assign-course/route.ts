import getUserDetails from '@/lib/isAuth';
import { assignCoursesToTrainee } from '@/services/repository/course';
import { getTraineeMentorId } from '@/services/repository/user';
import ApiResponse from '@/utils/api-response';
import { prisma } from '@/utils/prisma-client';
import { get } from 'http';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const body = await req.json();

    const { courseIds, traineeId }: { courseIds: string[]; traineeId: string } = body;

    const mentorId = await getTraineeMentorId(traineeId);

    if (mentorId !== user.id) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    await assignCoursesToTrainee({
      courseIds,
      traineeId,
    });

    return NextResponse.json(new ApiResponse(201, 'Courses assigned successfully', {}), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(new ApiResponse(401, 'Internal server error', {}), {
      status: 401,
    });
  }
};
