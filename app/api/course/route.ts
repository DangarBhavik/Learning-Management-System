import { CourseStatus, FileType } from '@/generated/prisma/enums';
import getUserDetails from '@/lib/isAuth';
import { uploadToCloud } from '@/services/external/cloudinary';
import { createCourse, getAllCourses } from '@/services/repository/course';
import { createFile } from '@/services/repository/file';
import ApiResponse from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const searchParams = req.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const search = searchParams.get('search') || '';
    const statusFilter = (searchParams.get('status') as CourseStatus | 'ALL') || 'ALL';
    const limit = limitParam === null ? undefined : Math.floor(Number(limitParam));

    const courses = await getAllCourses({
      userId: user.id,
      userRole: user.role,
      limit,
      search,
      statusFilter,
    });

    return NextResponse.json(new ApiResponse(200, 'Courses fetched successfully', courses), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch courses';
    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    if (user.role === 'TRAINEE') {
      return NextResponse.json(new ApiResponse(403, 'Unauthorised', {}), { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const thumbnail = formData.get('thumbnail') as File | null;

    if (!title || !description || !thumbnail) {
      return NextResponse.json(new ApiResponse(400, 'Please Provide All Details', {}), {
        status: 400,
      });
    }

    if (!thumbnail.type.startsWith('image/')) {
      return NextResponse.json(new ApiResponse(400, 'Only image files are acceptable', {}), {
        status: 400,
      });
    }

    const result = await uploadToCloud(thumbnail);

    if (!result) {
      return NextResponse.json(new ApiResponse(500, 'Failed to upload the Thumbnail', {}), {
        status: 500,
      });
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to create course';

    return NextResponse.json(new ApiResponse(500, errorMessage, {}), { status: 500 });
  }
};
