export const createModule = async ({ title, courseId }: { title: string; courseId: string }) => {
  const response = await fetch(`/api/course/${courseId}/module`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create Module');
  }

  const result = await response.json();

  if (!result.success && result.statusCode != 201) {
    throw new Error(result.message);
  }

  return result.data;
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
  const response = await fetch(`/api/course/${courseId}/module/${moduleId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update Module');
  }

  const result = await response.json();

  if (!result.success && result.statusCode != 200) {
    throw new Error(result.message);
  }

  return result.data;
};

export const deleteModule = async ({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) => {
  const response = await fetch(`/api/course/${courseId}/module/${moduleId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete Module');
  }

  const result = await response.json();

  if (!result.success && result.statusCode != 200) {
    throw new Error(result.message);
  }

  return result.data;
};
