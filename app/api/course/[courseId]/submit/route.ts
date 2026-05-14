import getUserDetails from '@/lib/isAuth';
import { changeCourseStatusToPending } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import { getAllAdminsID } from '@/services/repository/user';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { prisma } from '@/utils/prisma-client';
import sendError from '@/utils/send-error';
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
      throw new ApiError(403, 'Unauthorized to submit course for approval');
    }

    const updatedCourse = await changeCourseStatusToPending({ courseId });

    const adminIds = await getAllAdminsID();

    await Promise.all(
      adminIds.map(adminId =>
        createNotification({
          userId: adminId,
          message: `A course has been submitted for Approval: ${updatedCourse.title}`,
          link: `/app/courses/${updatedCourse.id}`,
        })
      )
    );

    return NextResponse.json(new ApiResponse(201, 'Course updated SuccessFully', updatedCourse), {
      status: 201,
    });
  } catch (error) {
    return sendError(error, 'Failed to submit course for approval');
  }
};
