import { useQuery } from '@tanstack/react-query';
import {
  getSubmissionsByTrainee,
  SubmissionType,
} from '@/services/apis/submissions';

export const useTraineeSubmissions = () => {
  return useQuery<SubmissionType[]>({
    queryKey: ['submission'],
    queryFn: getSubmissionsByTrainee,
  });
};