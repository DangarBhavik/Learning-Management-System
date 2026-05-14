import getUserDetails from '@/lib/isAuth';
import { createAssignment } from '@/services/repository/assignment';
import { getModuleById } from '@/services/repository/module';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> }
) => {
  try {
    const { moduleId, courseId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to create assignment for this course');
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      throw new ApiError(404, 'Module Not Found');
    }

    const body = await req.json();
    const { title, description, maxScore } = await body;

    if (!title && !description && !maxScore) {
      throw new ApiError(400, 'Please provide all details');
    }

    const createdAssignment = await createAssignment({
      title,
      description,
      maxScore,
      moduleId,
      userId: user.id,
    });

    return NextResponse.json(
      new ApiResponse(201, 'Assignment Created SuccessFully', createdAssignment),
      { status: 201 }
    );
  } catch (error) {
    return sendError(error, 'Failed to create assignment');
  }
};
