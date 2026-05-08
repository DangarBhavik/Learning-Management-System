import { sendRequest } from '@/utils/sendRequest';

export const uploadFile = async ({
  courseId,
  moduleId,
  resource,
}: {
  courseId: string;
  moduleId: string;
  resource: File;
}) => {
  const formData = new FormData();

  formData.append('resource', resource);

  const response = await sendRequest(
    `/api/course/${courseId}/module/${moduleId}/lesson/file`,
    'post',
    formData
  );

  return response.data;
};

export const deleteFile = async ({
  courseId,
  moduleId,
  fileId,
}: {
  courseId: string;
  moduleId: string;
  fileId: string;
}) => {
  const response = await sendRequest(
    `/api/course/${courseId}/module/${moduleId}/lesson/file/${fileId}`,
    'delete'
  );

  return response.data;
};
