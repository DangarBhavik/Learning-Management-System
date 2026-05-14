import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import { deleteModule, getModuleById, updateModule } from '@/services/repository/module';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import sendError from '@/utils/send-error';
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
      throw new ApiError(403, 'Unauthorized to update module for this course');
    }

    const body = await req.json();

    const { title } = body;

    if (!title) {
      throw new ApiError(400, 'Module title is required');
    }

    if (title.length < 2 || title.length > 100) {
      throw new ApiError(400, 'Module title must be between 2 and 100 characters long');
    }

    const moduleToUpdate = await getModuleById({ moduleId });

    if (!moduleToUpdate) {
      throw new ApiError(404, 'Module not found');
    }

    const updatedModule = await updateModule({ title, moduleId });

    return NextResponse.json(new ApiResponse(200, 'Module Updated Successfully', updatedModule), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to update module');
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
      throw new ApiError(403, 'Unauthorized to delete module for this course');
    }

    const moduleData = await getModuleById({
      moduleId,
      includeAssignments: true,
      includeLessons: true,
    });

    if (!moduleData) {
      throw new ApiError(404, 'Module not found');
    }

    const deletedFilesFromDb = await deleteModule({ moduleId });

    if (deletedFilesFromDb.length > 0) {
      await Promise.allSettled(
        deletedFilesFromDb.map(file => deleteFromCloud(file.public_id, file.type))
      );
    }

    return NextResponse.json(new ApiResponse(200, 'Module Deleted Successfully', {}), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to delete module');
  }
};
