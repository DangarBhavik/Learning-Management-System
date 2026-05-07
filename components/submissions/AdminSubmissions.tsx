'use client';

import SubmissionsTable from '@/components/submissions/SubmissionsTable';
import Loading from '@/components/ui/loading';
import { useAdminSubmissions } from '@/hooks/submission/useAdminSubmissions';

export default function AdminSubmissionsPage() {
  const { data: submissions = [], isLoading, isError } = useAdminSubmissions();

  if (isLoading) {
    return <Loading text="Submissions" />;
  }
  if (submissions.length === 0) {
    return <div>no submissions </div>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load submissions</p>;
  }
  // console.log(submissions);

  return (
    <div className="mx-4 sm:mx-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Monitor and review all assignment submissions.
        </p>
      </div>

      <SubmissionsTable submissions={submissions ?? []} />
    </div>
  );
}
