import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import { deleteFiles } from '@/services/repository/file';
import { deleteLesson, getLessonById, updateLesson } from '@/services/repository/lesson';
import { getModuleById } from '@/services/repository/module';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { extractEmbeddedFileIds } from '@/utils/getIdsFromMarkdown';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string; lessonId: string }> }
) => {
  try {
    const { lessonId, courseId, moduleId } = await params;
    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      return NextResponse.json(new ApiResponse(403, 'Module Not Found', {}), { status: 403 });
    }

    const lessonDetails = await getLessonById({ lessonId });
    if (!lessonDetails) {
      return NextResponse.json(new ApiResponse(404, 'Lesson not found', {}), {
        status: 404,
      });
    }

    const body = await req.json();

    const { title, content } = body;

    if (title.trim() == '' && content.trim() == '') {
      return NextResponse.json(new ApiResponse(403, 'Please Provide all Details', {}), {
        status: 403,
      });
    }

    const updatedLesson = await updateLesson({ title, content, lessonId });

    return NextResponse.json(new ApiResponse(200, 'Lesson Updated Successfully', updatedLesson), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string; lessonId: string }> }
) => {
  try {
    const { lessonId, courseId, moduleId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      return NextResponse.json(new ApiResponse(403, 'Module Not Found', {}), { status: 403 });
    }

    const lessonDetails = await getLessonById({ lessonId });

    if (!lessonDetails) {
      return NextResponse.json(new ApiResponse(404, 'Lesson not found', {}), {
        status: 404,
      });
    }

    const embeddedFileIds = extractEmbeddedFileIds(lessonDetails.content);

    const deletedLesson = await deleteLesson({ lessonId });

    if (embeddedFileIds.length > 0) {
      const filesToDeleteFromCloud = await deleteFiles(embeddedFileIds);
      if (filesToDeleteFromCloud.length > 0) {
        await Promise.all(
          filesToDeleteFromCloud.map(file => deleteFromCloud(file.public_id, file.type))
        );
      }
    }

    return NextResponse.json(new ApiResponse(200, 'Lesson Deleted Successfully', deletedLesson), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
