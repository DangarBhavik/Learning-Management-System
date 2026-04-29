import LessonForm from './LessonForm';
import { useParams } from 'next/navigation';
import { useModifyLesson } from '@/hooks/lesson/useModifyLesson';

function EditLesson({
  lessonId,
  moduleId,
  onClose,
  content,
  title,
}: {
  moduleId: string;
  lessonId: string;
  onClose: () => void;
  content: string;
  title: string;
}) {
  const { id: courseId } = useParams<{ id: string }>();

  const { editLesoon, isEditing } = useModifyLesson({ courseId, moduleId, lessonId });

  const handleSubmit = async ({ title, content }: { title: string; content: string }) => {
    await editLesoon({ title, content });
    onClose();
  };

  return (
    <LessonForm
      submitText="Save"
      isPending={isEditing}
      title={title}
      func={handleSubmit}
      moduleId={moduleId}
      onClose={onClose}
      content={content}
    />
  );
}

export default EditLesson;
