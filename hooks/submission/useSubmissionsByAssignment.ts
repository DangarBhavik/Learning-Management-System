import { useQuery } from '@tanstack/react-query';
import { getSubmissionsByAssignment } from '@/services/apis/submissions';
import { SubmissionType } from '@/types/submission';

export const useSubmissionsByAssignment = (assignmentId: string) => {
  return useQuery<SubmissionType[]>({
    queryKey: ['submissions', assignmentId],
    queryFn: () => getSubmissionsByAssignment(assignmentId),
    enabled: !!assignmentId,
  });
};
