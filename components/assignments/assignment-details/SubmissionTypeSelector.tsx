type SubmissionTypeSelectorProps = {
  value: 'FILE' | 'LINK';
  onChange: (type: 'FILE' | 'LINK') => void;
};

export function SubmissionTypeSelector({ value, onChange }: SubmissionTypeSelectorProps) {
  return (
    <div className="flex gap-2 mb-2">
      <button
        onClick={() => onChange('FILE')}
        className={`
            px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150
            ${
              value === 'FILE'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'text-gray-500 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `}
      >
        Upload File
      </button>

      <button
        onClick={() => onChange('LINK')}
        className={`
            px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-150
            ${
              value === 'LINK'
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'text-gray-500 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `}
      >
        GitHub Link
      </button>
    </div>
  );
}
