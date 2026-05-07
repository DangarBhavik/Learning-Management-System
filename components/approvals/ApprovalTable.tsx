import EmptyApproval from './EmptyApproval';
import ApprovalGrid from './ApprovalGrid';

type CourseType = {
  id: string;
  title: string;
  description: string;
  mentor: string;
  submittedAt: string;
  modules: number;
  lessons: number;
  image: string | null;
};

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
