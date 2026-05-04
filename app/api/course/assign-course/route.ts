import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { prisma } from '@/utils/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const user = await getUserDetails();

    const body = await req.json();

    const {
      courseIds,
      userId,
      role,
    }: { courseIds: string[]; userId: string; role: 'TRAINEE' | 'MENTOR' } = body;

    if (!userId || !role || courseIds.length === 0) {
      return NextResponse.json(new ApiResponse(400, 'Invalid payload', {}), { status: 400 });
    }

    if (user.role === 'MENTOR') {
      if (role !== 'TRAINEE') {
        return NextResponse.json(new ApiResponse(401, 'Mentor can assign only to trainees', {}), {
          status: 401,
        });
      }

      const userDetails = await prisma.user.findUnique({
        where: { id: userId },
        select: { mentorId: true },
      });

      if (userDetails?.mentorId !== user.id) {
        return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
      }
    }

    if (user.role !== 'ADMIN' && user.role !== 'MENTOR') {
      return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
    }

    await prisma.enrollment.createMany({
      data: courseIds.map(courseId => ({
        courseId,
        studentId: userId,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json(new ApiResponse(201, 'Courses assigned successfully', {}), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(new ApiResponse(500, 'Internal server error', {}), {
      status: 500,
    });
  }
};
