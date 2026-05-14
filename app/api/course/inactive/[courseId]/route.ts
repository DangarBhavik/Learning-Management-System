import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

import { getCourseDetailsById, inactiveCourse } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import ApiError from '@/utils/api-error';
import { userRoleCheck } from '@/utils/checkUserRole';
import sendError from '@/utils/send-error';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const user = await getUserDetails();

    const { courseId } = await params;

    const course = await getCourseDetailsById({ courseId });

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    const haveAccess = await checkCourseCrudAccess({ user, courseId });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to mark course as inactive');
    }

    const updatedCourse = await inactiveCourse({ courseId });

    await createNotification({
      userId: course.authorId,
      message: `Your course "${course.title}" has been marked as inactive.`,
      link: `/app/courses/${course.id}`,
    });

    return NextResponse.json(
      new ApiResponse(200, 'Course marked as inactive successfully', updatedCourse),
      { status: 200 }
    );
  } catch (error) {
    return sendError(error, 'Failed to mark course as inactive');
  }
};
