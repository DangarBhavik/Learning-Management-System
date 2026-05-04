import getUserDetails from '@/lib/isAuth';
import { uploadToCloud } from '@/services/external/cloudinary';
import { createFile } from '@/services/repository/file';
import ApiResponse from '@/utils/api-response';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { ResourceTypeToPrisma } from '@/utils/file-type-map';
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

    const formData = await req.formData();

    const file = formData.get('resource') as File;

    if (!file || file.size <= 0) {
      return NextResponse.json(new ApiResponse(402, 'Please provide Valid File', {}), {
        status: 403,
      });
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
    const errorMessge = error instanceof Error ? error.message : 'Failed to upload File';
    return NextResponse.json(new ApiResponse(500, errorMessge, {}), {
      status: 500,
    });
  }
};
