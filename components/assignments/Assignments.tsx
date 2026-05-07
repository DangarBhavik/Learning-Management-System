'use client';
import AssignmentCard from './AssignmentCards';
import EmptyState from './EmptyAssignment';

export type AssignmentType = {
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

const Assignments: React.FC<{ assignments: AssignmentType[] }> = ({ assignments }) => {
  if (assignments.length === 0) return <EmptyState />;

  return (
    <div className="space-y-3">
      <div className="space-y-2.5">
        {assignments.map((item, i) => (
          <AssignmentCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Assignments;
