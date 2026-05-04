import getUserDetails from '@/lib/isAuth';
import { getCourseDetails } from '@/services/repository/course';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const { courseId } = await params;

  const user = await getUserDetails();

  const haveAccess = await checkCourseCrudAccess({ user, courseId });

  if (!haveAccess) {
    return NextResponse.json(new ApiResponse(403, 'Forbidden', {}), { status: 403 });
  }

  const courseDetails = await getCourseDetails({ courseId });

  if (!courseDetails) {
    return NextResponse.json(new ApiResponse(404, 'Course not found', {}), { status: 404 });
  }

  return NextResponse.json(new ApiResponse(200, 'Course fetched successfully', courseDetails), {
    status: 200,
  });
};
