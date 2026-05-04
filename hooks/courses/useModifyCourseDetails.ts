import { updateCourse } from '@/services/apis/courses';
import { courseFormData } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export const useModifyCourseDetails = ({ courseId }: { courseId: string }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: courseFormData) => updateCourse(courseId, payload),
  });

  return { modifyCourseDetails: mutateAsync, isModifying: isPending };
};
