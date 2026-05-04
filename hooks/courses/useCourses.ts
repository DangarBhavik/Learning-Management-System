import { fetchCourses } from '@/services/apis/courses';
import { CourseCardProps } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const useCourses = (limit?: number) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<CourseCardProps[]>({
    queryKey: ['courses', limit],
    queryFn: () => fetchCourses({ limit }),
  });

  return { courses: data, isFetching: isLoading, isError, error };
};
