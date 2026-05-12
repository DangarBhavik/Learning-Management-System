export function LoadingSkeleton() {
    return (
      <section className="mx-8 mt-7 mb-12 space-y-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-7 w-64 rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800/60" />
          ))}
        </div>
        <div className="h-32 rounded-2xl bg-gray-100 dark:bg-gray-800/40" />
        <div className="h-44 rounded-2xl bg-gray-100 dark:bg-gray-800/40" />
      </section>
    );
  }