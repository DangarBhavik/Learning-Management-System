import { useParams } from 'next/navigation';
import { useState } from 'react';
import { MarkdownEditor } from '@/components/mdxEditor';
import EditLesson from './EditLesson';
import { useDeleteLesson } from '@/hooks/lesson/useDeleteLesson';
import { Lesson as LessonFormProp } from '@/types/module';
import { BookCheck } from 'lucide-react';
import DropDown from '@/components/ui/DropDown';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteConfirmation from '../DeleteConfimation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type LessonEditFormProps = {
  lesson: LessonFormProp;
  moduleId: string;
};

const Lesson: React.FC<LessonEditFormProps> = ({ lesson, moduleId }) => {
  const { id: courseId } = useParams<{ id: string }>();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { deleteLesson, isDeleting } = useDeleteLesson({ courseId, moduleId, lessonId: lesson.id });

  const handleDeleteLesson = async () => {
    await deleteLesson();
    setShowDeleteConfirmation(false);
  };

  const handleSelectDropDown = async (val: string) => {
    val.toLocaleLowerCase() == 'edit' ? setIsEditing(true) : setShowDeleteConfirmation(true);
  };

  return (
    <div className="flex border p-2 rounded-xl flex-col mx-8   justify-center    items-center">
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <div className="w-full hover:bg-gray-300/20 rounded-xl p-2">
            <div className="flex justify-between items-center px-2  ">
              <div className="flex items-center gap-4">
                <div className="bg-green-300/50 text-green-400/80 p-2 rounded-lg">
                  <BookCheck />
                </div>
                <div className="text-md font-medium">{lesson.title}</div>
              </div>
              <div className="flex gap-4">
                <DropDown
                  trigger={<BsThreeDotsVertical />}
                  options={['Edit', 'Delete']}
                  onSelect={handleSelectDropDown}
                />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t mt-1 border-slate-300/60">
          {isEditing ? (
            <EditLesson
              title={lesson.title}
              content={lesson.content}
              lessonId={lesson.id}
              moduleId={moduleId}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <MarkdownEditor
              value={lesson.content ?? ''}
              onChange={() => {}}
              readOnly={!isEditing}
              isEditing={isEditing}
              className="overflow-auto w-4/5  no-scrollbar"
            />
          )}
        </CollapsibleContent>
      </Collapsible>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDeleteLesson}
          onCancel={() => setShowDeleteConfirmation(false)}
          itemType={`lesson "${lesson.title}"`}
          isPending={isDeleting}
        />
      )}
    </div>
  );
};

export default Lesson;
