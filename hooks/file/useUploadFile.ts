import { uploadFile } from '@/services/apis/file';
import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadFile,
  });

  return {
    uploadFile: mutateAsync,
    isUploading: isPending,
  };
};
