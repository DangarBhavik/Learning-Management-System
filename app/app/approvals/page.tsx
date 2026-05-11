import ApprovalsPage from '@/components/approvals/Approvals';

export const metadata = {
  title: 'Course Approvals',
  description:
    'Manage course approvals efficiently. Review pending courses, approve or reject submissions, and maintain the quality of your learning platform.',
};

export default function CourseApprovalPage() {
  return <ApprovalsPage />;
}
