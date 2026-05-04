import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import { deleteAssignment } from '@/services/repository/assignment';
import { deleteFiles } from '@/services/repository/file';
import { deleteLesson } from '@/services/repository/lesson';
import { deleteModule, getModuleById, updateModule } from '@/services/repository/module';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { FileTypeToResourceType } from '@/utils/file-type-map';
import { extractEmbeddedFileIds } from '@/utils/getIdsFromMarkdown';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> }
) => {
  try {
    const { courseId, moduleId } = await params;
    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const body = await req.json();

    const { title } = body;

    if (!title) {
      return NextResponse.json(new ApiResponse(401, 'Provide Valid Title', {}), { status: 401 });
    }

    const moduleToUpdate = await getModuleById({ moduleId });

    if (!moduleToUpdate) {
      return NextResponse.json(new ApiResponse(404, 'Module not Found', {}), { status: 404 });
    }

    const updatedModule = await updateModule({ title, moduleId });

    return NextResponse.json(new ApiResponse(200, 'Module Updated Successfully', updatedModule), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unable to update module right now. Please try again.';

    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ moduleId: string; courseId: string }> }
) => {
  try {
    const { moduleId, courseId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const moduleData = await getModuleById({
      moduleId,
      includeAssignments: true,
      includeLessons: true,
    });

    if (!moduleData) {
      return NextResponse.json(new ApiResponse(404, 'Please Provide Valid id', {}), {
        status: 404,
      });
    }

    await deleteModule({ moduleId });

    await Promise.allSettled(
      moduleData.lessons.map(lesson => deleteLesson({ lessonId: lesson.id }))
    );

    await Promise.allSettled(
      moduleData.assignments.map(assignment => deleteAssignment({ assignmentId: assignment.id }))
    );

    const filesToDelete = [
      ...(moduleData.lessons?.flatMap(lesson => extractEmbeddedFileIds(lesson.content)) || []),
      ...(moduleData.assignments?.flatMap(assignment =>
        extractEmbeddedFileIds(assignment.description)
      ) || []),
    ];

    if (filesToDelete.length > 0) {
      const deletedFilesFromDb = await deleteFiles(filesToDelete);

      await Promise.allSettled(
        deletedFilesFromDb.map(file =>
          deleteFromCloud(file.public_id, FileTypeToResourceType[file.type])
        )
      );
    }

    await Promise.allSettled(
      moduleData.lessons.map(lesson => deleteLesson({ lessonId: lesson.id }))
    );

    await Promise.allSettled(
      moduleData.assignments.map(assignment => deleteAssignment({ assignmentId: assignment.id }))
    );

    return NextResponse.json(new ApiResponse(200, 'Module Deleted Successfully', {}), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      new ApiResponse(500, 'Unable to delete module right now. Please try again.', {}),
      { status: 500 }
    );
  }
};
