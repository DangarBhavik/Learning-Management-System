'use client';

import { useParams } from 'next/navigation';
import LessonForm from './LessonForm';
import { useCreateLesson } from '@/hooks/lesson/useCreateLesson';

type LessonAddFormProps = {
  moduleId: string;
  onClose: () => void;
};

const NewLesson: React.FC<LessonAddFormProps> = ({ moduleId, onClose }) => {
  const { id: courseId } = useParams<{ id: string }>();

  const { createLesson, isCreating } = useCreateLesson({ courseId, moduleId });

  const handleAddLesson = async ({ title, content }: { title: string; content: string }) => {
    try {
      await createLesson({ title, content });
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <LessonForm
      submitText="Add"
      onClose={onClose}
      formTitle="Add new Lesson"
      func={handleAddLesson}
      isPending={isCreating}
      moduleId={moduleId}
    />
  );
};

export default NewLesson;
