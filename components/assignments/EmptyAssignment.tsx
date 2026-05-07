import { BsFileEarmarkText } from 'react-icons/bs';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center text-2xl text-gray-300 dark:text-gray-600 mb-4">
        <BsFileEarmarkText />
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No assignments yet</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        Your assignments will appear here once your mentor assigns them.
      </p>
    </div>
  );
}
