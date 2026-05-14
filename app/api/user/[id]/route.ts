import getUserDetails from '@/lib/isAuth';
import { NextRequest, NextResponse } from 'next/server';
import ApiResponse from '@/utils/api-response';
import { auth } from '@clerk/nextjs/server';
import {
  getUserByClerkId,
  getMentorById,
  updateUserById,
  getUserById,
} from '@/services/repository/user';
import { userRoleCheck } from '@/utils/checkUserRole';
import { createNotification } from '@/services/repository/notification';
import ApiError from '@/utils/api-error';
import sendError from '@/utils/send-error';

export const GET = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const currentUser = await getUserDetails();

    if (userRoleCheck.isTrainee(currentUser.role)) {
      throw new ApiError(403, 'Unauthorized to view user details');
    }

    const { id } = await params;

    if (!id) {
      throw new ApiError(400, 'User ID is required');
    }

    const user = await getUserById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const payload = {
      ...user,
      mentorName: user.mentor?.username ?? null,
    };

    return NextResponse.json(new ApiResponse(200, 'User fetched successfully', payload), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to fetch user details');
  }
};

// PATCH /api/users/:id — admin can update user details

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const currentUser = await getUserDetails();

    if (!currentUser || !userRoleCheck.isAdmin(currentUser.role)) {
      throw new ApiError(403, 'Unauthorized to update user details');
    }

    const { id } = await params;

    if (!id) {
      throw new ApiError(400, 'User ID is required');
    }

    const body = await req.json();
    const { image, role, mentorId } = body;

    const existingUser = await getUserById(id);

    if (!existingUser) {
      throw new ApiError(404, 'User not found');
    }

    const nextRole = role ?? existingUser.role;
    let nextMentorId = mentorId;

    if (!userRoleCheck.isTrainee(nextRole)) {
      nextMentorId = null;
    } else if (nextMentorId) {
      const mentor = await getMentorById(nextMentorId);

      if (!mentor || !userRoleCheck.isMentor(mentor.role)) {
        throw new ApiError(400, 'Invalid mentor selected');
      }
    }

    const updatedUser = await updateUserById(id, {
      image: image ?? existingUser.image,
      role: nextRole,
      mentorId: userRoleCheck.isTrainee(nextRole) ? (nextMentorId ?? existingUser.mentorId) : null,
    });

    const mentor =
      updatedUser.mentorId && userRoleCheck.isTrainee(updatedUser.role)
        ? await getMentorById(updatedUser.mentorId)
        : null;

    const payload = {
      ...updatedUser,
      mentorName: mentor?.username ?? null,
    };

    if (role) {
      await createNotification({
        userId: updatedUser.id,
        message: `Your role has been updated to ${role}`,
        link: `/app/profile`,
      });
    }

    return NextResponse.json(new ApiResponse(200, 'User updated successfully', payload), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to update user details');
  }
};
