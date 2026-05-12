import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';

interface SubmissionHeaderProps {
  submission: {
    assignment: {
      title: string;
      module: {
        title: string;
        course: {
          title: string;
        };
      };
    };
  };
}

const SubmissionHeader = ({ submission }: SubmissionHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="space-y-2 min-w-0">
        <Link
          href="/app/review-submission"
          className="group inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 hover:text-violet-500 dark:text-gray-500 dark:hover:text-violet-400 transition-colors"
        >
          <HiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Review submissions
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          {submission.assignment.title}
        </h1>

        <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
          <span className="font-medium text-gray-500 dark:text-gray-400">
            {submission.assignment.module.course.title}
          </span>
          <span className="inline-block h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span>{submission.assignment.module.title}</span>
        </p>
      </div>
    </div>
  );
};

export default SubmissionHeader;
