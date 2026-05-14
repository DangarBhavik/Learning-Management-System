import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';
import { getCourseDetailsById, reactivateCourse } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import ApiError from '@/utils/api-error';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import sendError from '@/utils/send-error';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const user = await getUserDetails();

    const { courseId } = await params;

    const course = await getCourseDetailsById({
      courseId,
    });

    if (!course) {
      throw new ApiError(404, 'Course not found');
    }

    const haveAccess = await checkCourseCrudAccess({ user, courseId });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to reactivate course');
    }

    const updatedCourse = await reactivateCourse({
      courseId,
    });

    await createNotification({
      userId: course.authorId,
      message: `Your course "${course.title}" has been reactivated.`,
      link: `/app/courses/${course.id}`,
    });

    return NextResponse.json(
      new ApiResponse(200, 'Course reactivated successfully', updatedCourse),
      { status: 200 }
    );
  } catch (error) {
    return sendError(error, 'Failed to reactivate course');
  }
};
