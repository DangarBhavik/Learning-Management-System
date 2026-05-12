'use client';

import { BsFileEarmarkText, BsFileZip } from 'react-icons/bs';

const FilePreview = ({ type, url }: { type: 'zip' | 'other'; url: string }) => {
  const fileName = decodeURIComponent(url.split('/').pop()?.split('?')[0] || 'file');

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30 p-10">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          {type === 'zip' ? (
            <BsFileZip className="text-3xl text-orange-500" />
          ) : (
            <BsFileEarmarkText className="text-3xl text-gray-400" />
          )}
        </div>

        <h3 className="max-w-[300px] truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
          {fileName}
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {type === 'zip'
            ? 'Compressed archive preview is not supported.'
            : 'Preview unavailable for this file type.'}
        </p>

        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Download the file to inspect its contents.
        </p>
      </div>
    </div>
  );
};

export default FilePreview;
