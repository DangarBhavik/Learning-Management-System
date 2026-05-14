'use client';

import Assignment from './Assignment';
import { Assignment as AssignmentType } from '@/types/assignment';

const Assignments = ({
  assignments,
  moduleId,
}: {
  assignments: AssignmentType[];
  moduleId: string;
}) => {
  if (!assignments || assignments.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* <div className="flex justify-center ">
        <h5 className="dark:text-gray-300 text-black text-sm"> Assignments</h5>
      </div> */}
      {assignments.map(assignment => (
        <Assignment moduleId={moduleId} key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};

export default Assignments;
