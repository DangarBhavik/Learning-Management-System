import { HiOutlineDocumentText } from 'react-icons/hi2';
import { MarkdownEditor } from '@/components/mdxEditor';

type AssignmentDescriptionProps = {
  description: string;
};

export function AssignmentDescription({ description }: AssignmentDescriptionProps) {
  return (
    <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-950/50 px-6 py-5 shadow-sm space-y-2">
      <div className="flex items-center gap-2 mb-1">
        <HiOutlineDocumentText className="text-gray-400 dark:text-gray-500 text-base" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Description
        </h2>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <MarkdownEditor value={description} onChange={() => {}} isEditing={false} readOnly={true} />
      </div>
    </div>
  );
}
