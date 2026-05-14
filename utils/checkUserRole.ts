import { PrismaUserRole } from '@/types/user';

const userRoleMapping: Record<PrismaUserRole, string> = {
  MENTOR: 'MENTOR',
  TRAINEE: 'TRAINEE',
  ADMIN: 'ADMIN',
};

export const userRoleCheck = {
  isMentor: (role: PrismaUserRole) => role === userRoleMapping.MENTOR,
  isTrainee: (role: PrismaUserRole) => role === userRoleMapping.TRAINEE,
  isAdmin: (role: PrismaUserRole) => role === userRoleMapping.ADMIN,
};
