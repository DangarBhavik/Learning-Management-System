'use client';

import CourseCreateForm from '@/components/course-create-form/CourseCreateForm';
import { useCreateCourse } from '@/hooks/courses/useCreateCourse';
import { courseFormData } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddCourse() {
  const router = useRouter();

  const { createCourse, isCreatingCourse } = useCreateCourse();

  const handleSubmit = async (formData: courseFormData) => {
    if (formData.thumbnail == null) {
      return;
    }

    await createCourse(formData, {
      onSuccess: createdCourse => {
        router.push(`/app/add-course/${createdCourse.id}/content`);
      },
    });
    toast.success('Course Created Successfully!', { position: 'bottom-right' });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-black/40 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Create New Course</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Provide the basic information to get started with your course.
        </p>
      </div>

      <CourseCreateForm func={handleSubmit} isLoading={isCreatingCourse} />
    </div>
  );
}

export default AddCourse;
