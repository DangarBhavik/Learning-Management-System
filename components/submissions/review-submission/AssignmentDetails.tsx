import { BsFileEarmarkText } from 'react-icons/bs';
import { MarkdownEditor } from '@/components/mdxEditor/MdxEditor';
import SectionHeader from './SectionHeader';

interface AssignmentDetailsProps {
  assignment: {
    description: string;
    module: {
      title: string;
      course: {
        title: string;
      };
    };
  };
}

const AssignmentDetails = ({ assignment }: AssignmentDetailsProps) => {
  return (
    <>
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800/70 bg-white dark:bg-gray-950/60 shadow-sm overflow-hidden">
        <SectionHeader
          title="Description"
          icon={<BsFileEarmarkText />}
          gradientFrom="violet"
          gradientTo="indigo"
        />

        <div className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40 p-6">
            <MarkdownEditor
              value={assignment.description}
              onChange={() => {}}
              isEditing={false}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentDetails;
