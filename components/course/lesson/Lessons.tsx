import { Lesson as LessonType } from '@/types/types';
import Lesson from './Lesson';

const Lessons = ({ lessons, moduleId }: { lessons: LessonType[]; moduleId: string }) => {
  return (
    <>
      {lessons.length > 0 && (
        <>
          {/* <div className="flex justify-center ">
            <h5 className="dark:text-gray-300  text-black text-sm"> Lessons</h5>
          </div> */}
          <div className="space-y-4">
            {lessons.map(lesson => (
              <Lesson moduleId={moduleId} key={`${lesson.id}+${moduleId}`} lesson={lesson} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Lessons;
