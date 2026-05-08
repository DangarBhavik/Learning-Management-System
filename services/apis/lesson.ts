import { sendRequest } from '@/utils/sendRequest';

export const addLesson = async ({
  courseId,
  moduleId,
  title,
  content,
}: {
  courseId: string;
  moduleId: string;
  title: string;
  content: string;
}) => {
  const response = await sendRequest(
    `/api/course/${courseId}/module/${moduleId}/lesson`,
    'post',
    JSON.stringify({
      title,
      content,
    })
  );

  return response.data;
};

export const deleteLesson = async ({
  courseId,
  moduleId,
  lessonId,
}: {
  courseId: string;
  moduleId: string;
  lessonId: string;
}) => {
  const response = await sendRequest(
    `/api/course/${courseId}/module/${moduleId}/lesson/${lessonId}`,
    'delete'
  );

  return response.data;
};

export const editLesson = async ({
  courseId,
  moduleId,
  lessonId,
  title,
  content,
}: {
  courseId: string;
  moduleId: string;
  lessonId: string;
  title: string;
  content: string;
}) => {
  const response = await sendRequest(
    `/api/course/${courseId}/module/${moduleId}/lesson/${lessonId}`,
    'patch',
    JSON.stringify({ title, content })
  );

  return response.data;
};
