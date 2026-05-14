import getUserDetails from '@/lib/isAuth';
import { getCourseAuthorId } from '@/services/repository/course';
import { createModule } from '@/services/repository/module';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const { courseId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to create module for this course');
    }

    const body = await req.json();
    const { title } = body as { title: string };

    if (!title) {
      throw new ApiError(400, 'Module title is required');
    }

    if (title.length < 2 || title.length > 100) {
      throw new ApiError(400, 'Module title must be between 2 and 100 characters long');
    }

    const createdModule = await createModule({ title, courseId });

    return NextResponse.json(new ApiResponse(201, 'Module Created Successfully', createdModule), {
      status: 201,
    });
  } catch (error) {
    return sendError(error, 'Failed to create module');
  }
};
