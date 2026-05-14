import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import getUserDetails from '@/lib/isAuth';
import { approveCourse } from '@/services/repository/course';
import { createNotification } from '@/services/repository/notification';
import sendError from '@/utils/send-error';
import { userRoleCheck } from '@/utils/checkUserRole';
import ApiError from '@/utils/api-error';

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { courseId } = await context.params;
    const user = await getUserDetails();

    if (userRoleCheck.isAdmin(user.role)) {
      throw new ApiError(403, 'Unauthorized to approve course');
    }

    const updatedCourse = await approveCourse({ courseId });

    await createNotification({
      userId: updatedCourse.authorId,
      message: `Your course "${updatedCourse.title}" has been approved!`,
      link: `/app/courses/${updatedCourse.id}`,
    });

    return NextResponse.json(new ApiResponse(200, 'Course approved successfully', updatedCourse));
  } catch (error) {
    return sendError(error, 'Failed to approve course');
  }
};
