import { getTraineeAssignments } from '@/services/apis/assignments';
import { AssignmentFilter } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

type AssignmentType = {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  maxScore: number;
  moduleTitle: string;
  courseTitle: string;
  submission: {
    status: 'PENDING' | 'GRADED' | 'RESUBMITTED';
    score?: number | null;
  } | null;
};

const useAssignments = ({ filters }: { filters: AssignmentFilter }) => {
  const { data = [], isLoading } = useQuery<AssignmentType[]>({
    queryKey: ['assignments', filters],
    queryFn: () =>
      getTraineeAssignments({ search: filters.search, statusFilter: filters.statusFilter }),
  });

  return { assignments: data, isLoading };
};

export default useAssignments;
