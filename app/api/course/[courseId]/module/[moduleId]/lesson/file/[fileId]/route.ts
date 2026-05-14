import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import { deleteFile, getFileById } from '@/services/repository/file';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { FileTypeToResourceType } from '@/utils/file-type-map';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; fileId: string }> }
) => {
  try {
    const { courseId, fileId } = await params;

    const user = await getUserDetails();

    const haveAccess = await checkCourseCrudAccess({ courseId, user });

    if (!haveAccess) {
      throw new ApiError(403, 'Unauthorized to delete file for this course');
    }

    const file = await getFileById(fileId);

    if (!file) {
      throw new ApiError(404, 'File Not Found');
    }

    const deletedFile = await deleteFile(fileId);

    if (!deletedFile) {
      throw new ApiError(500, 'Failed to delete file');
    }

    await deleteFromCloud(deletedFile.public_id, FileTypeToResourceType[deletedFile.type]);

    return NextResponse.json(new ApiResponse(201, 'Resource Deleted Successfully', {}), {
      status: 201,
    });
  } catch (error) {
    return sendError(error, 'Failed to delete File');
  }
};
