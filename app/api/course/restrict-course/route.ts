import getUserDetails from '@/lib/isAuth';
import ApiResponse from '@/utils/api-response';
import { prisma } from '@/utils/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  try {
    const currentUser = await getUserDetails();
    const { courseIds, userId, role } = await req.json();

    if (!userId || !courseIds?.length) {
      return NextResponse.json(new ApiResponse(400, 'Invalid payload', {}), { status: 400 });
    }

    if (currentUser.role === 'MENTOR' && role === 'TRAINEE') {
      const trainee = await prisma.user.findUnique({
        where: { id: userId },
        select: { mentorId: true },
      });

      if (trainee?.mentorId !== currentUser.id) {
        return NextResponse.json(new ApiResponse(401, 'Unauthorised', {}), { status: 401 });
      }
    }

    await prisma.enrollment.deleteMany({
      where: {
        studentId: userId,
        courseId: { in: courseIds },
      },
    });

    return NextResponse.json(new ApiResponse(200, 'Courses restricted successfully', {}));
  } catch (error) {
    console.error(error);
    return NextResponse.json(new ApiResponse(500, 'Internal Server Error', {}), { status: 500 });
  }
};
