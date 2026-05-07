function EmptyApproval() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/60 dark:bg-gray-950/30 backdrop-blur-xl">
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600 dark:text-gray-300 px-6">
        <div className="mb-4 grid place-items-center h-12 w-12 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-950/40">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-gray-700 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-lg font-semibold">No pending approvals</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-md">
          All courses have been reviewed. New submissions will appear here.
        </p>
      </div>
    </div>
  );
}

export default EmptyApproval;
