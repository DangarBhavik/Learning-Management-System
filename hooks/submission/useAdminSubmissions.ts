import { useQuery } from '@tanstack/react-query';
import { getAllSubmissionsAdmin } from '@/services/apis/submissions';

export const useAdminSubmissions = () => {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: getAllSubmissionsAdmin,
  });
};
