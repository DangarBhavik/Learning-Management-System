import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { VscEdit } from 'react-icons/vsc';
import { Card } from '@/components/ui/card';
import { MarkdownEditor } from '@/components/mdxEditor';
import EditLesson from './EditLesson';
import { useDeleteLesson } from '@/hooks/lesson/useDeleteLesson';
import Pending from '../Pending';

type Lesson = {
  id: string;
  title: string;
  content: string;
};

type LessonEditFormProps = {
  lesson: Lesson;
  moduleId: string;
};

const Lesson: React.FC<LessonEditFormProps> = ({ lesson, moduleId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { id: courseId } = useParams<{ id: string }>();

  const { deleteLesson, isDeleting } = useDeleteLesson({ courseId, moduleId, lessonId: lesson.id });

  const handleDeleteLesson = async () => {
    await deleteLesson();
  };

  if (isEditing) {
    return (
      <EditLesson
        title={lesson.title}
        content={lesson.content}
        lessonId={lesson.id}
        moduleId={moduleId}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex justify-center bg-white dark:bg-[#1e2939]  items-center">
      <Card className="max-w-150 flex-1 border max-h-110  border-gray-400/30 p-4 ">
        <div className="flex justify-between items-center px-2  ">
          <div className=" font-medium">{lesson.title}</div>

          <div className="flex gap-4">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500/20 dark:bg-blue-500/10 p-2 rounded-lg hover:bg-blue-500/30 dark:hover:bg-blue-500/20 transition"
                >
                  <VscEdit className="text-blue-500 dark:text-blue-400" />
                </button>
                <button
                  onClick={handleDeleteLesson}
                  disabled={isDeleting}
                  className={`relative flex items-center justify-center p-2 rounded-lg transition ${isDeleting ? 'bg-red-500/10 cursor-not-allowed opacity-70' : 'bg-red-500/20 hover:bg-red-500/30 dark:bg-red-500/10 dark:hover:bg-red-500/20'}`}
                >
                  {isDeleting ? (
                    <Pending classes="text-red-400/50" />
                  ) : (
                    <BiTrash className="text-red-500 dark:text-red-300" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <MarkdownEditor
          value={lesson.content ?? ''}
          onChange={() => {}}
          readOnly={!isEditing}
          isEditing={isEditing}
          className="overflow-auto no-scrollbar"
        />

        {isEditing && (
          <div className="flex justify-end gap-4 items-center">
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button>Save</button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Lesson;
