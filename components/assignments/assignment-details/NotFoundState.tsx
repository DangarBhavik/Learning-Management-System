import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';
import { BsFileEarmarkText } from 'react-icons/bs';

export function NotFoundState() {
  return (
    <section className="mx-8 mt-7 flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl text-gray-300 dark:text-gray-600 mb-4">
        <BsFileEarmarkText />
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Assignment not found</p>
      <Link
        href="./"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
      >
        <HiArrowLeft className="text-sm" /> Back to assignments
      </Link>
    </section>
  );
}
