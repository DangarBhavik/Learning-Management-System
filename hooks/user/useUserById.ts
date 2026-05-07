import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/services/apis/users';

export const useUserById = (userId?: string) => {
  return useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: () => getUserById(userId as string),
    enabled: Boolean(userId),
  });
};
