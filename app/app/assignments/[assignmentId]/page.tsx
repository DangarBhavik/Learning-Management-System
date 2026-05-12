'use client';

import { use, useState, useRef } from 'react';
import { useAssignmentDetails } from '@/hooks/assignment/useAssignmentDetails';
import { useSubmissionsByAssignment } from '@/hooks/submission/useSubmissionsByAssignment';
import { useSubmitAssignment } from '@/hooks/submission/useSubmitAssignment';
import { LoadingSkeleton } from '@/components/assignments/assignment-details/LoadingSkeleton';
import { NotFoundState } from '@/components/assignments/assignment-details/NotFoundState';
import { AssignmentHeader } from '@/components/assignments/assignment-details/AssignmentHeader';
import { AssignmentStatsGrid } from '@/components/assignments/assignment-details/AssignmentStatsGrid';
import { AssignmentDescription } from '@/components/assignments/assignment-details/AssignmentDescription';
import { SubmissionForm } from '@/components/assignments/assignment-details/SubmissionForm';
import { SubmissionHistorySection } from '@/components/assignments/assignment-details/SubmissionHistorySection';

type Params = { assignmentId: string };
type Props = { params: Promise<Params> };

export default function AssignmentDetailsPage({ params }: Props) {
  const { assignmentId } = use(params);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submissionType, setSubmissionType] = useState<'FILE' | 'LINK'>('FILE');
  const [githubLink, setGithubLink] = useState('');

  const { data: assignment, isLoading } = useAssignmentDetails(assignmentId);
  const { data: submissions = [] } = useSubmissionsByAssignment(assignmentId);
  const mutation = useSubmitAssignment(assignmentId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append('assignmentId', assignmentId);

    if (submissionType === 'FILE') {
      if (!selectedFile) return;
      fd.append('file', selectedFile);
    } else {
      if (!githubLink) return;
      fd.append('githubLink', githubLink);
    }

    fd.append('type', submissionType);
    mutation.mutate(fd);
  };

  if (isLoading) return <LoadingSkeleton />;

  if (!assignment) return <NotFoundState />;

  const isOverdue =
    assignment?.status !== 'GRADED' &&
    assignment?.dueDate &&
    new Date(assignment.dueDate) < new Date();

  return (
    <section className="mx-8 mt-7 mb-12 space-y-7">
      <AssignmentHeader title={assignment.title} isOverdue={isOverdue} backLink="./" />

      <AssignmentStatsGrid
        dueDate={assignment.dueDate}
        maxScore={assignment.maxScore}
        status={assignment.status}
        isOverdue={isOverdue}
      />

      <div className="grid xl:grid-cols-2 gap-4 items-start">
        <AssignmentDescription description={assignment.description} />

        <SubmissionForm
          submissionType={submissionType}
          selectedFile={selectedFile}
          githubLink={githubLink}
          dragOver={dragOver}
          isPending={mutation.isPending}
          isSuccess={mutation.isSuccess}
          onSubmissionTypeChange={setSubmissionType}
          onFileChange={handleFileChange}
          onFileClear={() => setSelectedFile(null)}
          onGithubLinkChange={setGithubLink}
          onDragOver={setDragOver}
          onDrop={handleDrop}
          onSubmit={handleSubmit}
          fileInputRef={fileInputRef}
        />
      </div>

      {submissions.length > 0 && (
        <SubmissionHistorySection submissions={submissions} maxScore={assignment.maxScore} />
      )}
    </section>
  );
}
