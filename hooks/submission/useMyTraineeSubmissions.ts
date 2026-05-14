import { getMyTraineeSubmissions } from '@/services/apis/submissions';
import { SubmissionStatus } from '@/types/submission';
import { useQuery } from '@tanstack/react-query';

type submission = {
  assignment: { id: string; title: string };
  course: { title: string };
  fileUrl: string;
  id: string;
  score: number | null;
  maxScore: number;
  status: SubmissionStatus;
  student: { name: string; mentorName: string };
  submittedAt: string;
};

const useMyTraineeSubmissions = () => {
  const {
    data: submissions = [],
    isPending,
    isError,
    error,
  } = useQuery<submission[]>({
    queryKey: ['submissions'],
    queryFn: getMyTraineeSubmissions,
  });

  return { submissions, isPending, isError, error };
};

export default useMyTraineeSubmissions;
