export type User = {
  id: string;
  username: string;
  clerkId: string;
  email: string;
  image: string
  role: 'ADMIN' | 'MENTOR' | 'TRAINEE';
  mentorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}; 
export type UserType = {
  id: string;
  clerkId: string;
  mentorId: string | null;
  role: 'TRAINEE' | 'MENTOR' | 'ADMIN';
  username: string;
  email: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserRole = 'admin' | 'mentor' | 'trainee';

export type PrismaUserRole = 'ADMIN' | 'MENTOR' | 'TRAINEE';
export const Role = {
  TRAINEE: 'TRAINEE',
  MENTOR: 'MENTOR',
  ADMIN: 'ADMIN'
} as const

export type Role = (typeof Role)[keyof typeof Role]