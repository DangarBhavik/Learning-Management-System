import { useCreateAssignment } from '@/hooks/assignment/useCreateAssignment';
import AssignmentForm from './AssignmentForm';
import { useParams } from 'next/navigation';

const NewAssignment = ({ moduleId, onClose }: { moduleId: string; onClose: () => void }) => {
  const { id: courseId } = useParams<{ id: string }>();

  const { createAssignment, isCreating } = useCreateAssignment(courseId, moduleId);

  const handleAddAssignment = async ({
    title,
    description,
    maxScore,
  }: {
    title: string;
    description: string;
    maxScore: number;
  }) => {
    await createAssignment({ title, description, maxScore });
  };

  return (
    <AssignmentForm
      submitText="Add"
      onClose={onClose}
      func={handleAddAssignment}
      isPending={isCreating}
      moduleId={moduleId}
    />
  );
};

export default NewAssignment;
