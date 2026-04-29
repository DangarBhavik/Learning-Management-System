import { getCourseById } from '@/services/apis/courses';
import { useQuery } from '@tanstack/react-query';

export const useCourse = (courseId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['courses', courseId],
    queryFn: () => getCourseById(courseId),
    staleTime: 60 * 60 * 10,
  });

  return { course: data, isLoading };
};
