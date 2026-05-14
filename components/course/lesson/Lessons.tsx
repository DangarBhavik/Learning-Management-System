import { Lesson as LessonType } from '@/types/module';
import Lesson from './Lesson';

const Lessons = ({ lessons, moduleId }: { lessons: LessonType[]; moduleId: string }) => {
  return (
    <>
      {lessons.length > 0 && (
        <div className="space-y-4">
          {lessons.map(lesson => (
            <Lesson moduleId={moduleId} key={`${lesson.id}+${moduleId}`} lesson={lesson} />
          ))}
        </div>
      )}
    </>
  );
};

export default Lessons;
