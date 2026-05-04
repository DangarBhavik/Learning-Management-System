import { getCourseDetails } from '@/services/apis/courses';
import { useQuery } from '@tanstack/react-query';

export const useCourseDetails = (courseId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses', courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });

  return { courseDetails: data, isFetching: isLoading };
};
