import { useQuery } from '@tanstack/react-query';
import { getPendingCourses } from '@/services/apis/courses';

export const usePendingCourses = () => {
  return useQuery({
    queryKey: ['pendingCourses'],
    queryFn: getPendingCourses,
  });
};
