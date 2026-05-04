import getUserDetails from '@/lib/isAuth';
import { getCourseAuthorId } from '@/services/repository/course';
import { createModule } from '@/services/repository/module';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
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
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(new ApiResponse(401, 'Provide Module Title', {}), { status: 401 });
    }

    const createdModule = await createModule({ title, courseId });

    return NextResponse.json(new ApiResponse(201, 'Module Created Successfully', createdModule), {
      status: 201,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
