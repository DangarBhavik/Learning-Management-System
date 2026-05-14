import getUserDetails from '@/lib/isAuth';
import { getModuleById } from '@/services/repository/module';
import ApiResponse from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';
import { createLesson } from '@/services/repository/lesson';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ moduleId: string; courseId: string }> }
) => {
  try {
    const { moduleId, courseId } = await params;
    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to create lesson for this course');
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      throw new ApiError(404, 'Module not found');
    }

    const body = await req.json();

    const { title, content }: { title: string; content: string } = body;

    if (title.trim() == '' && content.trim() == '') {
      throw new ApiError(400, 'Please provide all details');
    }

    const lesson = await createLesson({ title, content, moduleId });

    return NextResponse.json(new ApiResponse(201, 'Lesson Uploaded Successfully', lesson), {
      status: 201,
    });
  } catch (error) {
    return sendError(error, 'Failed to create lesson');
  }
};
