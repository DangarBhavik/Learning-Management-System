import { fetchCourses } from '@/services/apis/courses';
import { CourseCardProps } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const useCourses = ({
  limit,
  filter,
}: { limit?: number; filter?: { search: string; statusFilter: string } } = {}) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<CourseCardProps[]>({
    queryKey: ['courses', limit, filter],
    queryFn: () =>
      fetchCourses({
        ...(limit !== undefined ? { limit } : {}),
        ...(filter ? { filters: filter } : {}),
      }),
  });

  return { courses: data, isFetching: isLoading, isError, error };
};
