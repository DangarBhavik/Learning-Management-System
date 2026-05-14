import { Module } from "./module";
import { PrismaUserRole } from "./user";

export const CourseStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  INACTIVE: 'INACTIVE'
} as const

export type CourseStatus = (typeof CourseStatus)[keyof typeof CourseStatus]

export type CourseType = {
  id: string;
  title: string;
  description: string;
  mentor: string;
  submittedAt: string;
  modules: number;
  lessons: number;
  image: string | null;
};

export type Course = {
  id: string;
  title: string;
  status: string;
  description: string;
  thumbnail: string | null;
  modules: Module[];
};

export type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  image: string;
  status: string;
  authorId: string;
  thumbnailId: string | null;
  createdAt: string;
  updatedAt: string;
  modulesCount: number;
  authorInitials?: string;
};

export type courseFormData = {
  title: string;
  description: string;
  thumbnail: File | null;
};

export type CoursesLayoutProps = {
  title: string;
  subtitle?: string;
  count?: number;
  isError?: boolean;
  errorText?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  role?: PrismaUserRole;
};

export type CourseDraft = {
  title?: string;
  description?: string;
  thumbnail: File | null;
};

export type CourseAssign = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  image: string;
  status: string;
  authorId: string;
  thumbnailId: string | null;
  createdAt: string;
  modulesCount: number;
  authorInitials?: string;
};