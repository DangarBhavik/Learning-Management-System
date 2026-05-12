import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

const BackButton = () => {
  return (
    <Link
      href="/app/review-submission"
      className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 shadow-sm hover:border-violet-300 hover:text-violet-600 dark:hover:border-violet-700 dark:hover:text-violet-400 transition-all duration-200"
    >
      <HiArrowLeft className="text-sm" /> Back to submissions
    </Link>
  );
};

export default BackButton;
