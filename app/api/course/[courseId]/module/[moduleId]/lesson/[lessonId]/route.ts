import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import { deleteFiles } from '@/services/repository/file';
import { deleteLesson, getLessonById, updateLesson } from '@/services/repository/lesson';
import { getModuleById } from '@/services/repository/module';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { extractEmbeddedFileIds } from '@/utils/getIdsFromMarkdown';
import sendError from '@/utils/send-error';
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
      throw new ApiError(403, 'Unauthorized to update lesson for this course');
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      throw new ApiError(404, 'Module not found');
    }

    const lessonDetails = await getLessonById({ lessonId });
    if (!lessonDetails) {
      throw new ApiError(404, 'Lesson not found');
    }

    const body = await req.json();

    const { title, content } = body;

    if (title.trim() == '' && content.trim() == '') {
      throw new ApiError(400, 'Please provide all details');
    }

    const updatedLesson = await updateLesson({ title, content, lessonId });

    return NextResponse.json(new ApiResponse(200, 'Lesson Updated Successfully', updatedLesson), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to update lesson');
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
      throw new ApiError(403, 'Unauthorized to delete lesson for this course');
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      throw new ApiError(404, 'Module not found');
    }

    const lessonDetails = await getLessonById({ lessonId });

    if (!lessonDetails) {
      throw new ApiError(404, 'Lesson not found');
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
    return sendError(error, 'Failed to delete lesson');
  }
};
