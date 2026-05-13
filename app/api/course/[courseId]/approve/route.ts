import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { approveCourse } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { courseId } = await context.params;
    const user = await getUserDetails();

    if (user.role != 'ADMIN') {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const updatedCourse = await approveCourse({ courseId });

    await createNotification({
      userId: updatedCourse.authorId,
      message: `Your course "${updatedCourse.title}" has been approved!`,
      link: `/app/courses/${updatedCourse.id}`,
    });

    return NextResponse.json(new ApiResponse(200, 'Course approved successfully', updatedCourse));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
