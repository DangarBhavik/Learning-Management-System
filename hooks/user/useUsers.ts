import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/apis/users';

export const useUsers = ({
  limit,
}: { limit?: number } = {}) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['admin', 'users', limit],
    queryFn: () => getUsers({ limit }),
  });

  return {
    users: data?.users ?? [],
    stats: data?.stats,
    isLoading,
    isError,
    error,
  };
};