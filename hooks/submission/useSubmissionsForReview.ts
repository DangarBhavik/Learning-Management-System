import { useQuery } from '@tanstack/react-query';
import { getAllSubmissionsForReview } from '@/services/apis/submissions';

export const useSubmissionsForReview = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['submissions'],
    queryFn: getAllSubmissionsForReview,
  });
  return { submissions: data ?? [], isLoading, isError };
};
