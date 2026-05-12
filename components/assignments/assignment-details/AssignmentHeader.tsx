import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';

type AssignmentHeaderProps = {
  title: string;
  isOverdue: boolean;
  backLink: string;
};

export function AssignmentHeader({ title, isOverdue, backLink }: AssignmentHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="space-y-1 min-w-0">
        <Link
          href={backLink}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors mb-1"
        >
          <HiArrowLeft className="text-xs" /> Assignments
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          {title}
        </h1>
        {isOverdue && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 tracking-wide mt-1">
            Overdue
          </span>
        )}
      </div>
    </div>
  );
}
