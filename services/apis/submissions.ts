import { SubmissionStatus } from '@/generated/prisma/enums';
import { sendRequest } from '@/utils/sendRequest';

export type SubmissionType = {
  id: string;
  file: {
    id: string;
    url: string;
    public_id: string;
  } | null;
  githubLink?: string;
  score?: number | null;
  feedback?: string | null;
  status: SubmissionStatus;
  isActive: boolean;
  submittedAt: string;
  gradedAt?: string | null;
  assignmentId: string;
  studentId: string;
  assignment: {
    id: string;
    title: string;
    description: string;
    dueDate?: string | null;
    maxScore: number;
    module: {
      id: string;
      title: string;
      course: {
        id: string;
        title: string;
      };
    };
  };
  student: {
    id: string;
    username: string;
    email: string;
    image: string;
  };
};

export const getMyTraineeSubmissions = async () => {
  const response = await sendRequest(`/api/submission`);
  return response.data;
};

export const getSubmissionsByAssignment = async (id: string) => {
  const response = await sendRequest(`/api/submission/${id}`);
  return response.data;
};

export const getSubmissionById = async (submissionId: string) => {
  const response = await sendRequest(`/api/submission/view/${submissionId}`);
  return response.data;
};

export const submitAssignment = async (formData: FormData) => {
  const response = await sendRequest(`/api/assignments/submit`, 'post', formData);
  return response.data;
};

export const updateFeedback = async ({
  feedback,
  score,
  submissionId,
}: {
  feedback: string;
  score: number | null;
  submissionId: string;
}) => {
  const response = await sendRequest(
    `/api/submission/view/${submissionId}`,
    'patch',
    JSON.stringify({ feedback, score, submissionId })
  );
  return response.data;
};

export const getSubmissionsByTrainee = async () => {
  const response = await sendRequest(`/api/submission/trainee`);
  return response.data;
};

export const getAllSubmissionsAdmin = async () => {
  const response = await sendRequest(`/api/submission`);
  return response.data;
};
