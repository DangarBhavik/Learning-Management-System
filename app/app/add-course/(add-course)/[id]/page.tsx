'use client';

import CourseCreateForm from '@/components/course-create-form/CourseCreateForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Loading from '@/components/ui/loading';
import { useCourseDetails } from '@/hooks/courses/useCourseDetails';
import { useModifyCourseDetails } from '@/hooks/courses/useModifyCourseDetails';
import { courseFormData } from '@/types/types';
import { useParams, useRouter } from 'next/navigation';

type CourseDetails = {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
};

type CourseDraft = {
  title?: string;
  description?: string;
  thumbnail: File | null;
};

function AddCourse() {
  const router = useRouter();
  const { id: courseId } = useParams<{ id: string }>();

  const { courseDetails: course, isFetching } = useCourseDetails(courseId);
  const { modifyCourseDetails, isModifying } = useModifyCourseDetails({ courseId });

  const handleSubmit = async (formData: CourseDraft) => {
    if (!course) {
      return;
    }

    if (
      course.title == formData.title &&
      course.description == formData.description &&
      formData.thumbnail == null
    ) {
      return router.push(`/app/add-course/${courseId}/content`);
    }

    const payload: courseFormData = {
      title: formData.title ?? course.title,
      description: formData.description ?? course.description,
      thumbnail: formData.thumbnail,
    };

    await modifyCourseDetails(payload, {
      onSuccess: () => router.push(`/app/add-course/${courseId}/content`),
    });
  };

  if (isFetching) {
    return <Loading text="Course Details" />;
  }

  if (!isFetching && !course) {
    return <p>Unable to load course details.</p>;
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-black/40 p-8 border  dark:border-gray-800 text-sm">
      <CardHeader className="">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Course</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Update your course details and continue adding content.
        </p>
      </CardHeader>

      <CardContent>
        <CourseCreateForm
          func={handleSubmit}
          title={course.title}
          description={course.description}
          url={course.thumbnail ?? ''}
          isLoading={isModifying}
        />
      </CardContent>
    </Card>
  );
}

export default AddCourse;
