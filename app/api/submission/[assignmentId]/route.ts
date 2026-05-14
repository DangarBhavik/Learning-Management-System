import { NextRequest, NextResponse } from 'next/server';
import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { getSubmissionsByAssignmentAndStudent } from '@/services/repository/submission';
import sendError from '@/utils/send-error';

const sendResponse = (status: number, message: string, data: unknown) =>
  NextResponse.json(new ApiResponse(status, message, data), { status });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  try {
    const user = await getUserDetails();

    const { assignmentId } = await params;

    const submissions = await getSubmissionsByAssignmentAndStudent(assignmentId, user.id);

    return sendResponse(200, 'Submissions fetched', submissions);
  } catch (error) {
    return sendError(error, 'Failed to fetch submissions');
  }
}
