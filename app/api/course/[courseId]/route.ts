import getUserDetails from '@/lib/isAuth';
import { deleteFromCloud, uploadToCloud } from '@/services/external/cloudinary';
import ApiResponse from '@/utils/api-response';
import { FileTypeToResourceType } from '@/utils/file-type-map';
import { NextRequest, NextResponse } from 'next/server';
import {
  getCourseById,
  getCourseThumbnail,
  getEnrolledStudentIds,
  updateCourse,
} from '@/services/repository/course';
import { checkCourseCrudAccess } from '@/utils/checkCourseCrudAccess';
import { createFile, deleteFile } from '@/services/repository/file';
import { userRoleCheck } from '@/utils/checkUserRole';
import { FileType } from '@/types/file';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const user = await getUserDetails();

  const { courseId } = await params;

  if (!courseId) {
    return NextResponse.json(new ApiResponse(400, 'CourseId required', {}), {
      status: 400,
    });
  }

  const enrollments = await getEnrolledStudentIds({ courseId });

  const isEnrolled = enrollments.some(e => e.studentId === user.id);

  if (!isEnrolled && userRoleCheck.isTrainee(user.role)) {
    return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
  }

  const course = await getCourseById({ courseId, userId: user.id });

  return NextResponse.json(new ApiResponse(200, 'Course fetched successfully', course), {
    status: 200,
  });
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const user = await getUserDetails();

    const { courseId } = await params;

    const haveAccess = await checkCourseCrudAccess({ user, courseId });

    if (!haveAccess) {
      return NextResponse.json(new ApiResponse(403, 'Forbidden', {}), { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('thumbnail') as File | null;

    if (!title && !description && !thumbnail) {
      return NextResponse.json(new ApiResponse(400, 'Please Provide All Details', {}), {
        status: 400,
      });
    }

    const oldThumbnail = await getCourseThumbnail({ courseId });

    if (!oldThumbnail && !thumbnail) {
      return NextResponse.json(new ApiResponse(404, 'Please upload a thumbnail', {}), {
        status: 404,
      });
    }

    let thumbnailIdToUpdate: string | undefined;

    if (thumbnail && thumbnail.size > 0) {
      if (!thumbnail.type.startsWith('image/')) {
        return NextResponse.json(new ApiResponse(400, 'Only image files are acceptable', {}), {
          status: 400,
        });
      }

      const uploadResult = await uploadToCloud(thumbnail);

      if (!uploadResult) {
        return NextResponse.json(new ApiResponse(500, 'Failed to upload the Thumbnail', {}), {
          status: 500,
        });
      }

      const file = await createFile({
        userId: user.id,
        type: FileType.IMAGE,
        size: thumbnail.size,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });

      thumbnailIdToUpdate = file.id;
    }

    const updatedCourse = await updateCourse({
      courseId,
      title,
      description,
      thumbnailId: thumbnailIdToUpdate,
    });

    if (thumbnailIdToUpdate && oldThumbnail) {
      await deleteFile(oldThumbnail.id);
      await deleteFromCloud(oldThumbnail.public_id, FileTypeToResourceType[oldThumbnail.type]);
    }

    return NextResponse.json(new ApiResponse(200, 'Course Updated SuccessFully', updatedCourse), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(new ApiResponse(400, errorMessage, {}), {
      status: 400,
    });
  }
};
