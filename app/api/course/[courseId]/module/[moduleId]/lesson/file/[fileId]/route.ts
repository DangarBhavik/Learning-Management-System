import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud } from '@/services/external/cloudinary';
import { deleteFile, getFileById } from '@/services/repository/file';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { FileTypeToResourceType } from '@/utils/file-type-map';
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
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    const file = await getFileById(fileId);

    if (!file) {
      return NextResponse.json(new ApiResponse(404, 'File Not Found', {}), { status: 404 });
    }

    const deletedFile = await deleteFile(fileId);

    if (!deletedFile) {
      return NextResponse.json(new ApiResponse(500, 'Failed to Delete File', {}), { status: 500 });
    }

    await deleteFromCloud(deletedFile.public_id, FileTypeToResourceType[deletedFile.type]);

    return NextResponse.json(new ApiResponse(201, 'Resource Deleted Successfully', {}), {
      status: 201,
    });
  } catch (error) {
    const errorMessge = error instanceof Error ? error.message : 'Failed to Delete File';
    return NextResponse.json(new ApiResponse(500, errorMessge, {}), {
      status: 500,
    });
  }
};
