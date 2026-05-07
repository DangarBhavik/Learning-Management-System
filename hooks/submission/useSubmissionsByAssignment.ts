import { useQuery } from '@tanstack/react-query';
import { getSubmissionsByAssignment, SubmissionType } from '@/services/apis/submissions';

export const useSubmissionsByAssignment = (assignmentId: string) => {
  return useQuery<SubmissionType[]>({
    queryKey: ['submissions', assignmentId],
    queryFn: () => getSubmissionsByAssignment(assignmentId),
    enabled: !!assignmentId,
  });
};
