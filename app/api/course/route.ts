import { CourseStatus, FileType } from '@/generated/prisma/enums';
import getUserDetails from '@/lib/isAuth';
import { uploadToCloud } from '@/services/external/cloudinary';
import { createCourse, getAllCourses } from '@/services/repository/course';
import { createFile } from '@/services/repository/file';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import { userRoleCheck } from '@/utils/checkUserRole';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();
    const searchParams = req.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const pageParam = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    const statusFilter = (searchParams.get('status') as CourseStatus | 'ALL') || 'ALL';
    const limit = limitParam === null ? undefined : Math.floor(Number(limitParam));
    let skip = 0;
    if (limit !== undefined) {
      skip = (Math.floor(Number(pageParam)) - 1) * limit;
    }

    const courses = await getAllCourses({
      userId: user.id,
      userRole: user.role,
      skip,
      limit,
      search,
      statusFilter,
    });

    return NextResponse.json(new ApiResponse(200, 'Courses fetched successfully', courses), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch courses');
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    if (userRoleCheck.isTrainee(user.role)) {
      throw new ApiError(403, 'Unauthorized to create course');
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('thumbnail') as File | null;

    if (!title || !description || !thumbnail) {
      throw new ApiError(400, 'Title, description, and thumbnail are required');
    }

    if (title.length < 5 || title.length > 100) {
      throw new ApiError(400, 'Title must be between 5 and 100 characters');
    }

    if (!thumbnail.type.startsWith('image/')) {
      throw new ApiError(400, 'Thumbnail must be an image file');
    }

    const result = await uploadToCloud(thumbnail);

    if (!result) {
      throw new ApiError(500, 'Failed to upload thumbnail');
    }

    const { url, public_id, bytes } = result;

    const file = await createFile({
      url,
      public_id,
      type: FileType.IMAGE,
      size: bytes,
      userId: user.id,
    });

    const course = await createCourse({
      title,
      description,
      thumbnailId: file.id,
      authorId: user.id,
    });

    return NextResponse.json(new ApiResponse(201, 'Course Created Successfully', course), {
      status: 201,
    });
  } catch (error) {
    return sendError(error, 'Failed to create course');
  }
};
