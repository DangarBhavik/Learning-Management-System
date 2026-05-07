import { useQuery } from '@tanstack/react-query';
import { getAssignmentById } from '@/services/apis/assignments';

export const useAssignmentDetails = (assignmentId: string) => {
  return useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: () => getAssignmentById(assignmentId),
    enabled: !!assignmentId,
  });
};
