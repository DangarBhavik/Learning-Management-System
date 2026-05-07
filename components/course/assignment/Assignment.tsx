import { MarkdownEditor } from '@/components/mdxEditor';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AssignmentForm from './AssignmentForm';
import { useModifyAssignment } from '@/hooks/assignment/useModifyAssignment';
import DropDown from '@/components/ui/DropDown';
import { useDeleteAssignment } from '@/hooks/assignment/useDeleteAssignment';
import { BookCheck } from 'lucide-react';
import DeleteConfirmation from '../DeleteConfimation';
import { Assignment as AssignmentType } from '@/types/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Assignment = ({ assignment, moduleId }: { assignment: AssignmentType; moduleId: string }) => {
  const { id: courseId } = useParams<{ id: string }>();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { updateAssignment, isUpdating } = useModifyAssignment(courseId, moduleId, assignment.id);
  const { deleteAssignment, isDeleting } = useDeleteAssignment(courseId, moduleId, assignment.id);

  const handleConfirmDelete = async () => {
    try {
      await deleteAssignment();
      setShowDeleteConfirmation(false);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleUpdateAssignment = async ({
    title,
    description,
    maxScore,
  }: {
    title: string;
    description: string;
    maxScore: number;
  }) => {
    await updateAssignment({
      description,
      maxScore,
      title,
    });
  };

  const handleSelectDropDown = async (val: string) => {
    val.toLocaleLowerCase() == 'edit' ? setShowEditForm(true) : setShowDeleteConfirmation(true);
  };

  return (
    <div key={assignment.id} className="flex border p-2 rounded-xl flex-col mx-8 items-center">
      <Collapsible className="w-full">
        <CollapsibleTrigger className="w-full" asChild>
          <div className="flex-1 hover:bg-gray-300/20 rounded-xl p-2 ">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-300/50 text-gray-400/80 p-2 rounded-lg">
                  <BookCheck className="" />
                </div>
                <div>
                  <div className="font-medium">{assignment.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Max score: {assignment.maxScore}
                  </div>
                </div>
              </div>
              <div>
                <DropDown
                  trigger={<BsThreeDotsVertical />}
                  options={['Edit', 'Delete']}
                  onSelect={handleSelectDropDown}
                />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="border-t mt-2 border-slate-300/60 ">
          {showEditForm ? (
            <AssignmentForm
              submitText="Save"
              moduleId={moduleId}
              isPending={isUpdating || isDeleting}
              func={handleUpdateAssignment}
              onClose={setShowEditForm.bind(null, false)}
              description={assignment.description}
              maxScore={assignment.maxScore}
              title={assignment.title}
            />
          ) : (
            <MarkdownEditor
              courseId={courseId}
              moduleId={moduleId}
              value={assignment.description ?? ''}
              onChange={() => {}}
              readOnly
              isEditing={false}
              className="overflow-auto no-scrollbar"
            />
          )}
        </CollapsibleContent>
      </Collapsible>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
          itemType={`assignment "${assignment.title}"`}
          isPending={isDeleting}
        />
      )}
    </div>
  );
};

export default Assignment;
