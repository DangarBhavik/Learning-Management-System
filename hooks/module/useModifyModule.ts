import { editModule } from '@/services/apis/module';
import { Course } from '@/types/types';
import queryClient from '@/utils/query-client';
import { useMutation } from '@tanstack/react-query';

export const useModifyModule = ({ courseId, moduleId }: { courseId: string; moduleId: string }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ title }: { title: string }) => editModule({ courseId, moduleId, title }),
    onSuccess: data => {
      queryClient.setQueryData(['courses', courseId], (old: Course) => {
        if (!old) return old;

        return {
          ...old,
          modules: old.modules.map(module =>
            module.id === moduleId ? { ...module, title: data.title } : module
          ),
        };
      });
    },
  });

  return { modifyModule: mutateAsync, isModifying: isPending };
};
