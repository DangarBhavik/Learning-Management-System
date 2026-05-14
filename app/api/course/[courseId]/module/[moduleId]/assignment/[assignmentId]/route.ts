import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import {
  deleteAssignment,
  getAssignmentById,
  updateAssignment,
} from '@/services/repository/assignment';
import { deleteFiles } from '@/services/repository/file';
import { getModuleById } from '@/services/repository/module';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { FileTypeToResourceType } from '@/utils/file-type-map';
import { extractEmbeddedFileIds } from '@/utils/getIdsFromMarkdown';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string; assignmentId: string }> }
) => {
  try {
    const { courseId, moduleId, assignmentId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to delete assignment for this course');
    }

    const moduleDetails = await getModuleById({ moduleId });

    if (!moduleDetails) {
      throw new ApiError(404, 'Module Not Found');
    }

    const assignmentDetails = await getAssignmentById({ assignmentId });

    if (!assignmentDetails) {
      throw new ApiError(404, 'Assignment not found');
    }

    const embeddedFileIds = extractEmbeddedFileIds(assignmentDetails.description);

    const deletedAssignment = await deleteAssignment({ assignmentId });

    if (embeddedFileIds.length > 0) {
      const filesToDeleteFromCloud = await deleteFiles(embeddedFileIds);
      if (filesToDeleteFromCloud.length > 0) {
        await Promise.allSettled(
          filesToDeleteFromCloud.map(file =>
            deleteFromCloud(file.public_id, FileTypeToResourceType[file.type])
          )
        );
      }
    }

    return NextResponse.json(
      new ApiResponse(200, 'Assignment Deleted Successfully', deletedAssignment),
      { status: 200 }
    );
  } catch (error) {
    return sendError(error, 'Failed to delete assignment');
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string; assignmentId: string }> }
) => {
  try {
    const { courseId, moduleId, assignmentId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to update assignment for this course');
    }

    const assignmentDetails = await getAssignmentById({ assignmentId });

    if (!assignmentDetails) {
      throw new ApiError(404, 'Assignment not found');
    }

    const body = await req.json();

    const { title, description, maxScore, dueDate } = body as {
      title?: string;
      description?: string;
      maxScore?: number | string;
      dueDate?: string | number | null;
    };

    const data: {
      title?: string;
      description?: string;
      maxScore?: number;
      dueDate?: Date | null;
    } = {
      title,
      description,
      maxScore: maxScore === undefined ? undefined : Number(maxScore),
      dueDate:
        dueDate === undefined
          ? undefined
          : dueDate === null || dueDate === ''
            ? null
            : new Date(dueDate),
    };

    const hasAnyField = Object.values(data).some(v => v !== undefined);

    if (!hasAnyField) {
      return NextResponse.json(new ApiResponse(400, 'No fields provided to update', {}), {
        status: 400,
      });
    }

    const updatedAssignment = await updateAssignment({ assignmentId, data });

    return NextResponse.json(
      new ApiResponse(200, 'Assignment Updated Successfully', updatedAssignment),
      { status: 200 }
    );
  } catch (error) {
    return sendError(error, 'Failed to update assignment');
  }
};
