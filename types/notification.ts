export type NotificationItem = {
  link: string | null;
  id: string;
  userId: string;
  createdAt: Date;
  message: string;
  isRead: boolean;
};

export type NotificationMeta = {
  unreadCount: number;
  readCount: number;
  totalCount: number;
};

export type NotificationsData = {
  notifications: NotificationItem[];
  meta: NotificationMeta;
};

export type Notification = {
    link: string | null;
    id: string;
    createdAt: Date;
    userId: string;
    message: string;
    isRead: boolean;
}

export type NotificationFilterType = 'all' | 'read' | 'unread';