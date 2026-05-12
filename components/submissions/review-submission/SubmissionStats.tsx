import { BiCalendar } from 'react-icons/bi';
import { LuFileBadge } from 'react-icons/lu';
import { BsFileEarmarkText } from 'react-icons/bs';
import AssignmentCards from '@/components/assignments/AssignmentStatsCards';
import StatusBadge from '@/components/assignments/StatusBadge';

interface SubmissionStatsProps {
  submission: {
    status: string;
    score?: number | null;
    submittedAt: string;
    assignment: {
      maxScore: number;
    };
  };
}

const SubmissionStats = ({ submission }: SubmissionStatsProps) => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <AssignmentCards
        title="Status"
        value={<StatusBadge status={submission.status} />}
        icon={<BsFileEarmarkText />}
        color={submission.status === 'GRADED' ? 'emerald' : 'gray'}
      />
      <AssignmentCards
        title="Score"
        value={
          submission.score !== null && submission.score !== undefined
            ? `${submission.score} / ${submission.assignment.maxScore}`
            : '—'
        }
        icon={<LuFileBadge />}
        color={submission.score !== null && submission.score !== undefined ? 'indigo' : 'gray'}
      />
      <AssignmentCards
        title="Submitted"
        value={new Date(submission.submittedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
        icon={<BiCalendar />}
        color="gray"
      />
    </div>
  );
};

export default SubmissionStats;
