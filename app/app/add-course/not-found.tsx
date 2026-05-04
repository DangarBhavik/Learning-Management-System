import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-3/4 flex items-center justify-center  p-6">
      <div className="text-center  ">
        <div className="mx-auto mb-6 w-28 h-28 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-12 h-12 text-gray-400 dark:text-gray-300"
          >
            <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
            <path
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M12 16v.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Course not found
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          The course you are looking for does not exist or has been removed.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/app/courses"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Courses
          </Link>

          <Link
            href="/app/add-course"
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Create Course
          </Link>
        </div>
      </div>
    </div>
  );
}
