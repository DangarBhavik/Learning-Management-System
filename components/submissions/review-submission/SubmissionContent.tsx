import { BsFileEarmarkText } from 'react-icons/bs';
import SubmissionPreview from './SubmissionPreview';

interface SubmissionContentProps {
  submission: {
    file?: {
      url: string;
    } | null;
    githubLink?: string | null;
  };
}

const SubmissionContent = ({ submission }: SubmissionContentProps) => {
  const submissionUrl = submission?.file?.url || submission?.githubLink;

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800/70 bg-white dark:bg-gray-950/60 shadow-sm overflow-hidden">
      <div className="relative border-b border-gray-100 dark:border-gray-800 px-6 py-5 flex items-center justify-between gap-3">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-indigo-400 to-violet-500 rounded-r-full" />
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">Submission Preview</h2>
        <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 px-3 py-1.5 text-[10px] font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
          Student Upload
        </span>
      </div>

      <div className="p-6">
        {submissionUrl ? <SubmissionPreview url={submissionUrl} /> : <EmptySubmissionState />}
      </div>
    </div>
  );
};

const EmptySubmissionState = () => (
  <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-10 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
      <BsFileEarmarkText className="text-2xl text-gray-300 dark:text-gray-600" />
    </div>
    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No submission file</p>
    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">No file or link was submitted.</p>
  </div>
);

export default SubmissionContent;
