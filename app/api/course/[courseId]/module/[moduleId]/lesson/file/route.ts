import getUserDetails from '@/lib/isAuth';
import { uploadToCloud } from '@/services/external/cloudinary';
import { createFile } from '@/services/repository/file';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { ResourceTypeToPrisma } from '@/utils/file-type-map';
import sendError from '@/utils/send-error';
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
      throw new ApiError(403, 'Unauthorized to upload file for this course');
    }

    const formData = await req.formData();

    const file = formData.get('resource') as File;

    if (!file || file.size <= 0) {
      throw new ApiError(400, 'No file uploaded');
    }

    const result = await uploadToCloud(file);

    const { url, bytes, public_id, resource_type } = result;

    const fileType =
      resource_type in ResourceTypeToPrisma
        ? ResourceTypeToPrisma[resource_type as keyof typeof ResourceTypeToPrisma]
        : ResourceTypeToPrisma.raw;

    const createdFile = await createFile({
      url,
      size: bytes,
      public_id,
      type: fileType,
      userId: user.id,
    });

    return NextResponse.json(new ApiResponse(201, 'Resource Uploaded Successfully', createdFile), {
      status: 201,
    });
  } catch (error) {
    return sendError(error, 'Failed to upload File');
  }
};
