'use client';

import { Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

const CourseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const path = usePathname();

  const isAddCourse = path.includes('/add-course');
  const isContent = path.includes('/content');

  return (
    <div className="flex-1 min-h-screen dark:bg-[#131b2b] bg-gray-300/20 ">
      <nav className="relative pt-4 mx-8">
        <div className="absolute  top-9 left-0 w-full h-1 z-10  bg-gray-200 dark:bg-gray-500/30 rounded-full ">
          <div
            className={`bg-blue-700/70 dark:bg-blue-400 ${isContent ? 'w-3/4' : 'w-1/4'} h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.45)]`}
          ></div>
        </div>
        <ul className="flex items-center justify-between  p-2">
          <li className="flex-1 flex flex-col items-center justify-center text-center ">
            <span
              className={`h-8 w-8 z-20 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                isAddCourse
                  ? 'bg-blue-500 text-white shadow-sm ring-2 ring-blue-200 dark:ring-blue-900/40'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {isContent ? <Check className="h-4" /> : 1}
            </span>
            <span
              className={`block px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                isAddCourse && 'text-blue-400'
              }`}
            >
              Course Details
            </span>
          </li>

          <li className="flex-1 flex flex-col items-center justify-center text-center ">
            <span
              className={`h-8 w-8 z-20 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                isContent
                  ? 'bg-blue-500 text-white shadow-sm ring-2 ring-blue-200 dark:ring-blue-900/40'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              2
            </span>
            <span
              className={`inline-block px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                isContent && 'text-blue-400'
              }`}
            >
              Course Content
            </span>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default CourseLayout;
