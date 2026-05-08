import { sendRequest } from '@/utils/sendRequest';

export const createModule = async ({ title, courseId }: { title: string; courseId: string }) => {
  const response = await sendRequest(
    `/api/course/${courseId}/module`,
    'post',
    JSON.stringify({ title })
  );

  return response.data;
};

export const editModule = async ({
  courseId,
  title,
  moduleId,
}: {
  courseId: string;
  title: string;
  moduleId: string;
}) => {
  const response = await sendRequest(
    `/api/course/${courseId}/module/${moduleId}`,
    'patch',
    JSON.stringify({ title })
  );

  return response.data;
};

export const deleteModule = async ({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) => {
  const response = await sendRequest(`/api/course/${courseId}/module/${moduleId}`, 'delete');

  return response.data;
};
