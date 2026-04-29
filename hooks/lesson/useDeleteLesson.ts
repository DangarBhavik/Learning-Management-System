import { deleteLesson } from '@/services/apis/lesson';
import { Course } from '@/types/types';
import queryClient from '@/utils/query-client';
import { useMutation } from '@tanstack/react-query';

export const useDeleteLesson = ({
  courseId,
  moduleId,
  lessonId,
}: {
  courseId: string;
  moduleId: string;
  lessonId: string;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteLesson({ courseId, moduleId, lessonId }),
    onSuccess: deletedLesson => {
      queryClient.setQueryData(['courses', courseId], (old: Course) => {
        if (!old) return old;
        return {
          ...old,
          modules: old.modules.map(module => {
            if (module.id !== moduleId) {
              return module;
            }
            return {
              ...module,
              lessons: module.lessons.filter(lesson => lesson.id !== deletedLesson.id),
            };
          }),
        };
      });
    },
  });

  return { deleteLesson: mutateAsync, isDeleting: isPending };
};
