import { getCourseById } from '@/services/apis/courses';
import { Course } from '@/types/course';
import { useQuery } from '@tanstack/react-query';

export const useCourse = (courseId: string) => {
  const { data, isLoading } = useQuery<Course>({
    queryKey: ['courses', courseId],
    queryFn: () => getCourseById(courseId),
  });

  return { course: data, isLoading };
};
