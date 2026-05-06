import { deleteFile } from '@/services/apis/file';
import { useMutation } from '@tanstack/react-query';

export const useDeleteFile = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteFile,
  });

  return {
    deleteFile: mutateAsync,
    isDeleting: isPending,
  };
};
