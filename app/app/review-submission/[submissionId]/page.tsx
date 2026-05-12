'use client';

import { useParams } from 'next/navigation';
import FeedbackSection from '@/components/submissions/FeedbackSection';
import Loading from '@/components/ui/loading';
import useSubmission from '@/hooks/submission/useSubmission';
import SubmissionHeader from '@/components/submissions/review-submission/SubmissionHeader';
import SubmissionStats from '@/components/submissions/review-submission/SubmissionStats';
import AssignmentDetails from '@/components/submissions/review-submission/AssignmentDetails';
import StudentInfo from '@/components/submissions/review-submission/StudentInfo';
import SubmissionContent from '@/components/submissions/review-submission/SubmissionContent';
import InfoCard from '@/components/submissions/review-submission/InfoCard';
import ErrorState from '@/components/submissions/review-submission/ErrorState';
import NotFoundState from '@/components/submissions/review-submission/NotFoundState';

const SubmissionReviewPage = () => {
  const params = useParams();
  const submissionId = params.submissionId as string;
  const { isError, isPending, submission } = useSubmission({ submissionId });

  if (isPending) {
    return <Loading text="Submission" />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!submission) {
    return <NotFoundState />;
  }

  return (
    <section className="relative mx-6 lg:mx-10 mt-8 mb-20 space-y-8">
      <SubmissionHeader submission={submission} />
      <SubmissionStats submission={submission} />

      <div className="grid sm:grid-cols-2 gap-4">
        <InfoCard label="Course" value={submission.assignment.module.course.title} />
        <InfoCard label="Module" value={submission.assignment.module.title} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AssignmentDetails assignment={submission.assignment} />

        <div className="space-y-6">
          <StudentInfo student={submission.student} />
          <SubmissionContent submission={submission} />
        </div>
      </div>

      <FeedbackSection
        score={submission.score || null}
        feedback={submission.feedback}
        submissionId={submission.id}
        maxScore={submission.assignment.maxScore}
      />
    </section>
  );
};
export default SubmissionReviewPage;
