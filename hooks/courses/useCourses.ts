import { fetchCourses } from '@/services/apis/courses';
import { Course } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const useCourses = ({
  limit,
  page,
  filter,
}: {
  limit?: number;
  page?: number;
  filter?: {
    search: string;
    statusFilter: string;
  };
} = {}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['courses', limit, page, filter],
    queryFn: () =>
      fetchCourses({
        ...(limit !== undefined ? { limit } : {}),
        ...(page !== undefined ? { page } : {}),
        ...(filter ? { filters: filter } : {}),
      }),
  });

  return {
    courses: data?.courses ?? [],
    stats: data?.stats,
    pagination: { ...data?.pagination, currentPage: page ?? 1 },
    isFetching: isLoading,
    isError,
    error,
  };
};
