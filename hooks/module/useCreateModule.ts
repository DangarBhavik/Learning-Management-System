import { createModule } from '@/services/apis/module';
import { Course } from '@/types/types';
import queryClient from '@/utils/query-client';
import createToast from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateModule = ({ courseId }: { courseId: string }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ title }: { title: string }) => createModule({ courseId, title }),
    onSuccess: data => {
      queryClient.setQueryData(['courses', courseId], (oldData: Course) => {
        if (!oldData) return oldData;

        const newModule = {
          id: data.id,
          title: data.title,
          order: data.order,
          lessons: [],
        };

        return {
          ...oldData,
          modules: [...(oldData.modules ?? []), newModule],
        };
      });
<<<<<<< HEAD
      createToast('Module Created Successfully', 'success');
=======
      createToast('Module created successfully!', 'success');
    },
    onError: error => {
      createToast(error.message || 'Failed to create Module', 'error');
>>>>>>> 680280eeacbf9218e986c09f2e1fc8542c1a75d5
    },
  });

  return { createModule: mutateAsync, isCreating: isPending };
};
