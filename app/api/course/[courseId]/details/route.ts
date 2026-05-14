import getUserDetails from '@/lib/isAuth';
import { getCourseDetails } from '@/services/repository/course';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { courseId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ user, courseId });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to view course details');
    }

    const courseDetails = await getCourseDetails({ courseId });

    if (!courseDetails) {
      throw new ApiError(404, 'Course not found');
    }

    return NextResponse.json(new ApiResponse(200, 'Course fetched successfully', courseDetails), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch course details');
  }
};
