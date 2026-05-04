import getUserDetails from '@/lib/isAuth';
import { changeCourseStatusToPending } from '@/services/repository/course';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { prisma } from '@/utils/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { courseId } = await params;
    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ user: user, courseId });

    if (!haveAccess) {
      return NextResponse.json(new ApiResponse(403, 'Forbidden', {}), { status: 403 });
    }

    const updatedCourse = await changeCourseStatusToPending({ courseId });

    return NextResponse.json(new ApiResponse(201, 'Course updated SuccessFully', updatedCourse), {
      status: 201,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(new ApiResponse(401, errorMessage, {}), { status: 401 });
  }
};
