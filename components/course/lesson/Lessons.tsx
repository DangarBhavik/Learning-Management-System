import Lesson from './Lesson';

type LessonType = {
  id: string;
  title: string;
  content: string;
};
const Lessons = ({ lessons, moduleId }: { lessons: LessonType[]; moduleId: string }) => {
  return (
    <>
      {lessons.length > 0 && (
        <>
          <div className="flex justify-center ">
            <h5 className="bg-white text-sm"> Lessons</h5>
          </div>
          {lessons.map(lesson => (
            <Lesson moduleId={moduleId} key={`${lesson.id}+${moduleId}`} lesson={lesson} />
          ))}
        </>
      )}
    </>
  );
};

export default Lessons;
