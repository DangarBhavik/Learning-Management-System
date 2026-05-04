import getUserDetails from '@/lib/isAuth';
import { createAssignment } from '@/services/repository/assignment';
import { getModuleById } from '@/services/repository/module';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
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
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      return NextResponse.json(new ApiResponse(403, 'Module Not Found', {}), { status: 403 });
    }

    const body = await req.json();
    const { title, description, maxScore } = await body;

    if (!title && !description && !maxScore) {
      return NextResponse.json(new ApiResponse(401, 'Provide All Details', {}), { status: 401 });
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
  } catch {
    return NextResponse.json(new ApiResponse(401, 'Failed to create Assignment ', {}), {
      status: 401,
    });
  }
};
