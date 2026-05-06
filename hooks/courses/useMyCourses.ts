import { getMyCourses } from '@/services/apis/courses';
import { CourseCardProps } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const useMyCourses = () => {
  const { data = [], isLoading } = useQuery<CourseCardProps[]>({
    queryKey: ['my-courses'],
    queryFn: getMyCourses,
  });

  return { myCourses: data, isLoading };
};
