'use client';

import Modules from '@/components/course/module/Modules';
import NewModule from '@/components/course/module/NewModule';
import { CourseStatus } from '@/types/course';
import { notFound, useParams, useRouter } from 'next/navigation';
import Loading from '../ui/loading';
import Link from 'next/link';
import { useCourse } from '@/hooks/courses/useCourse';
import { useSaveCourse } from '@/hooks/courses/useSaveCourse';
import { MoveLeft } from 'lucide-react';
import { Module, ModuleWithAssignment } from '@/types/module';

const AddContent = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const router = useRouter();

  const { course, isLoading } = useCourse(courseId);
  const { saveCourse, isSaving } = useSaveCourse();

  const handleSaveCourse = async () => {
    await saveCourse(
      { courseId },
      {
        onSuccess: () => {
          router.push(`/app/courses`);
        },
      }
    );
  };

  if (isLoading) {
    return <Loading text="Course Content" />;
  }

  if (!isLoading && !course) {
    notFound();
  }

  return (
    <div className="relative h-full w-full  no-scrollbar ">
      <div className="flex mx-8 justify-between items-center gap-4 ">
        <div className="flex justify-center items-center gap-2">
          <Link
            href={`/app/add-course/${courseId}/`}
            className="text-md flex justify-center mb-1.5 text-gray-600/80 dark:text-gray-300 "
          >
            <MoveLeft />
          </Link>
          <h1 className="mb-2 ml-2 text-2xl  font-semibold text-gray-900 dark:text-gray-100">
            {course!.title}
          </h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link
            href={`/app/courses/${courseId}`}
            className="py-1 px-3 text-sm border border-blue-600/80 hover:bg-blue-500 hover:text-white text-blue-700 dark:hover:text-blue-300 rounded-md"
          >
            Preview
          </Link>
          {course!.status == CourseStatus.DRAFT && (
            <button
              onClick={handleSaveCourse}
              className="py-0.75 px-2 text-md border border-gray-600/80 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-md "
              disabled={isSaving}
            >
              {isSaving ? 'Publishing' : 'Publish'}
            </button>
          )}
        </div>
      </div>
      <div className="absolute  left-1/2 top-0 h-full -z-10 rounded-3xl border-l-2 border-dashed " />
      <div className=" mt-4 mx-8 overflow-hidden ">
        {course!.modules &&
          course!.modules.map((module : Module, index: number) => (
            <Modules
              key={module.id}
              index={index}
              id={module.id}
              title={module.title}
              lessons={module.lessons}
              assignments={module.assignments}
            />
          ))}
      </div>

      <div className="mt-6 ">
        <NewModule />
      </div>
    </div>
  );
};

export default AddContent;
