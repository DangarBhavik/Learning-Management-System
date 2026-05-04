import { createCourse } from '@/services/apis/courses';
import { useMutation } from '@tanstack/react-query';

export const useCreateCourse = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCourse,
  });

  return {
    createCourse: mutateAsync,
    isCreatingCourse: isPending,
  };
};
