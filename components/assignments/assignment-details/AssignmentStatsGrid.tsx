import { BiCalendar } from 'react-icons/bi';
import { LuFileBadge } from 'react-icons/lu';
import { BsFileEarmarkText } from 'react-icons/bs';
import AssignmentCards from '@/components/assignments/AssignmentStatsCards';
import StatusBadge from '@/components/assignments/StatusBadge';

type AssignmentStatsGridProps = {
  dueDate?: string;
  maxScore: number;
  status: string;
  isOverdue: boolean;
};

export function AssignmentStatsGrid({
  dueDate,
  maxScore,
  status,
  isOverdue,
}: AssignmentStatsGridProps) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <AssignmentCards
        title="Due Date"
        value={dueDate ? formatDate(dueDate) : 'No Due Date'}
        icon={<BiCalendar />}
        color={isOverdue ? 'amber' : 'gray'}
      />
      <AssignmentCards title="Max Score" value={maxScore} icon={<LuFileBadge />} color="indigo" />
      <AssignmentCards
        title="Status"
        value={<StatusBadge status={status} />}
        icon={<BsFileEarmarkText />}
        color={status === 'GRADED' ? 'emerald' : 'gray'}
      />
    </div>
  );
}
