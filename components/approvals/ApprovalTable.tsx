import EmptyApproval from './EmptyApproval';
import ApprovalGrid from './ApprovalGrid';
import { CourseType } from '@/types/course';

type Props = {
  courses: CourseType[];
};

export default function ApprovalTable({ courses }: Props) {
  return (
    <div className="space-y-6">
      {courses.length === 0 ? <EmptyApproval /> : <ApprovalGrid courses={courses} />}
    </div>
  );
}
