import { SubmissionStatus } from '@/types/submission';
import { sendRequest } from '@/utils/sendRequest';

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

export const getSubmissionsByTrainee = async ({
  filters,
  page = 1,
}: {
  filters: { search?: string; status?: string };
  page?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (page) {
    queryParams.append('page', page.toString());
  }
  if (filters.search) {
    queryParams.append('search', filters.search);
  }
  if (filters.status && filters.status !== 'ALL') {
    queryParams.append('status', filters.status);
  }

  const response = await sendRequest(`/api/submission/trainee?${queryParams.toString()}`);
  return response.data;
};

export const getAllSubmissionsForReview = async ({
  filters,
  page = 1,
}: {
  filters: { search: string; status: SubmissionStatus[] };
  page?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (page) {
    queryParams.append('page', page.toString());
  }
  if (filters.search) {
    queryParams.append('search', filters.search);
  }
  if (filters.status.length > 0) {
    filters.status.forEach(status => queryParams.append('status', status));
  }

  const response = await sendRequest(`/api/submission?${queryParams.toString()}`);
  return response.data;
};
