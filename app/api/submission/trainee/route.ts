import { NextRequest, NextResponse } from 'next/server';
import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { getStudentSubmissions } from '@/services/repository/submission';
import { SubmissionStatus } from '@/types/submission';
import sendError from '@/utils/send-error';

const sendResponse = (status: number, message: string, data: unknown) =>
  NextResponse.json(new ApiResponse(status, message, data), { status });

export async function GET(req: NextRequest) {
  try {
    const user = await getUserDetails();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const status = (searchParams.get('status') as SubmissionStatus | 'ALL') || 'ALL';
    const LIMIT = 10;
    const skip = (page - 1) * LIMIT;
    const { submissions, pagination } = await getStudentSubmissions({
      studentId: user.id,
      search,
      status,
      limit: LIMIT,
      skip,
    });

    const paginatedResponse = {
      submissions,
      pagination,
    };

    return sendResponse(200, 'Submissions fetched', paginatedResponse);
  } catch (error) {
    return sendError(error, 'Failed to fetch submissions');
  }
}
