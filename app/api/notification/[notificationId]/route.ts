import getUserDetails from '@/lib/isAuth';
import { getNotificationById, markNotificationAsRead } from '@/services/repository/notification';
import ApiError from '@/utils/api-error';
import ApiResponse from '@/utils/api-response';
import sendError from '@/utils/send-error';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) => {
  try {
    const user = await getUserDetails();

    const { notificationId } = await params;

    const notification = await getNotificationById(notificationId);

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    if (notification.userId !== user.id) {
      throw new ApiError(403, 'Unauthorized');
    }

    await markNotificationAsRead(notificationId);

    return NextResponse.json(new ApiResponse(200, 'Notification marked as read', {}), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to mark notification as read');
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) => {
  try {
    const user = await getUserDetails();

    const { notificationId } = await params;

    const notification = await getNotificationById(notificationId);

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    if (notification.userId !== user.id) {
      throw new ApiError(403, 'Unauthorized');
    }

    await markNotificationAsRead(notificationId);

    return NextResponse.json(new ApiResponse(200, 'Notification marked as read', {}), {
      status: 200,
    });
  } catch (error) {
    return sendError(error, 'Failed to delete notification');
  }
};
