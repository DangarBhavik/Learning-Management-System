import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

import { getCourseDetailsById, reactivateCourse } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';

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
      return NextResponse.json(new ApiResponse(404, 'Course not found', null), { status: 404 });
    }

    if (user.role !== 'ADMIN' && course.authorId !== user.id) {
      return NextResponse.json(new ApiResponse(403, 'Forbidden', null), { status: 403 });
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
    console.error(error);

    return NextResponse.json(new ApiResponse(500, 'Internal server error', null), { status: 500 });
  }
};
