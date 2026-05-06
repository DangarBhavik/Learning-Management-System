import { getAssignableUsers } from '@/services/apis/users';
import { useQuery } from '@tanstack/react-query';

type UserType = {
  id: string;
  clerkId: string;
  mentorId: string | null;
  role: 'TRAINEE' | 'MENTOR';
  username: string;
  email: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export const useGetAssignableUsers =  () => {
  const { data, isLoading, isError, error } = useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: getAssignableUsers,
  });

  return {
    users: data ?? [],
    isLoading,
    isError,
    error,
  };
};
