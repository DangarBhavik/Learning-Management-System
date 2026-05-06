const AssignSkeleton = () => {
  return (
    <div className="space-y-4 dark:bg-[#101828] min-h-screen  p-8">
      <div className="h-10 dark:bg-[#0b111f] w-64 animate-pulse rounded-md bg-muted" />
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 auto-rows-max">
        <div className="lg:col-span-1  space-y-4">
          <div className="h-12 w-full animate-pulse rounded-lg dark:bg-[#0b111f] bg-muted shadow-md" />
          <div className="h-64 animate-pulse rounded-lg dark:bg-[#0b111f] bg-muted shadow-md" />
        </div>
        <div className="lg:col-span-2 h-96 animate-pulse rounded-lg dark:bg-[#0b111f] bg-muted shadow-md" />
      </div>
    </div>
  );
};

export default AssignSkeleton;
