import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import { getFormattedAssignableCourses } from '@/services/repository/course';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const limit = Number(searchParams.get('limit')) || 3;
    const page = Number(searchParams.get('page')) || 1;
    const userId = searchParams.get('traineeId');
    const skip = (page - 1) * limit;

    if (!userId) {
      throw new ApiError(400, 'Trainee ID is required');
    }

    const assignableCourses = await getFormattedAssignableCourses({ userId, page, limit, skip });

    return NextResponse.json(
      new ApiResponse(200, 'Assignable courses fetched successfully', assignableCourses),
      {
        status: 200,
      }
    );
  } catch (error) {
    return sendError(error, 'Failed to fetch assignable courses');
  }
};
