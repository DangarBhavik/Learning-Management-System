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
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const user = await getUserDetails();

    const { courseId } = await params;

    if (!courseId) {
      throw new ApiError(400, 'Course ID is required');
    }

    const enrollments = await getEnrolledStudentIds({ courseId });

    const isEnrolled = enrollments.some(e => e.studentId === user.id);

    if (!isEnrolled && userRoleCheck.isTrainee(user.role)) {
      throw new ApiError(403, 'Forbidden');
    }

    const course = await getCourseById({ courseId, userId: user.id });

    return NextResponse.json(new ApiResponse(200, 'Course fetched successfully', course), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch course');
  }
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
      throw new ApiError(403, 'Unauthorized to update course');
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('thumbnail') as File | null;

    if (!title && !description && !thumbnail) {
      throw new ApiError(
        400,
        'At least one field (title, description, or thumbnail) is required to update'
      );
    }

    if (title && (title.length < 5 || title.length > 100)) {
      throw new ApiError(400, 'Title must be between 5 and 100 characters');
    }

    const oldThumbnail = await getCourseThumbnail({ courseId });

    if (!oldThumbnail && !thumbnail) {
      throw new ApiError(400, 'Thumbnail is required for courses without an existing thumbnail');
    }

    let thumbnailIdToUpdate: string | undefined;

    if (thumbnail && thumbnail.size > 0) {
      if (!thumbnail.type.startsWith('image/')) {
        throw new ApiError(400, 'Thumbnail must be an image file');
      }

      const uploadResult = await uploadToCloud(thumbnail);

      if (!uploadResult) {
        throw new ApiError(500, 'Failed to upload thumbnail');
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
    return sendError(error, 'Failed to update course');
  }
};
