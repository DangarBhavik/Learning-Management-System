import { HiOutlineCloudArrowUp, HiOutlineXCircle, HiCheckCircle } from 'react-icons/hi2';

type SubmitButtonProps = {
  isPending: boolean;
  isSuccess: boolean;
  isDisabled: boolean;
  onSubmit: () => void;
  onClear: () => void;
  selectedFile: File | null;
};

export function SubmitButton({
  isPending,
  isSuccess,
  isDisabled,
  onSubmit,
  onClear,
  selectedFile,
}: SubmitButtonProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={onSubmit}
        disabled={isDisabled}
        className="
          inline-flex items-center gap-2 rounded-xl px-5 py-2.5
          text-xs font-semibold
          bg-gray-900 dark:bg-white text-white dark:text-gray-900
          hover:opacity-85 hover:shadow-sm
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-150
        "
      >
        <HiOutlineCloudArrowUp className="text-sm" />
        {isPending ? 'Submitting…' : 'Submit Assignment'}
      </button>

      {selectedFile && !isPending && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <HiOutlineXCircle className="text-sm" /> Clear
        </button>
      )}

      {isPending && (
        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-indigo-500 animate-spin" />
          Uploading…
        </span>
      )}

      {isSuccess && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <HiCheckCircle className="text-sm" /> Submitted successfully
        </span>
      )}
    </div>
  );
}
