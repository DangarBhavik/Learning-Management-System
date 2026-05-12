import { LuFileBadge } from 'react-icons/lu';
import SubmissionHistory from '@/components/submissions/SubmissionHistory';
import { SubmissionType } from '@/services/apis/submissions';

type SubmissionHistorySectionProps = {
  submissions: SubmissionType[];
  maxScore: number;
};

export function SubmissionHistorySection({ submissions, maxScore }: SubmissionHistorySectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-950/50 px-6 py-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <LuFileBadge className="text-gray-400 dark:text-gray-500 text-base" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Submission History
        </h2>
      </div>
      <SubmissionHistory submissions={submissions} maxScore={maxScore} />
    </div>
  );
}
