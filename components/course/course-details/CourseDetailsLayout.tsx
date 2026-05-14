'use client';

import { useState } from 'react';
import { CourseHeader } from './CourseHeader';
import { ContentViewer } from './ContentViewer';
import { CourseStats } from './CourseStats';
import { ModuleList } from './ModuleList';
import { Lesson, ModuleWithAssignment } from '@/types/module';

type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
  thumbnail: string | null;
  modules: ModuleWithAssignment[];
};

type Props = {
  course: Course;
  topActions?: React.ReactNode;
  showSubmission?: boolean;
};

export default function CourseDetailsLayout({ course, topActions, showSubmission = false }: Props) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const firstLesson = course?.modules?.[0]?.lessons?.[0];
  const currentLesson = activeLesson ?? firstLesson;

  // console.log(currentLesson);

  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gray-950">
      <CourseHeader course={course} />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-22 relative z-10 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContentViewer lesson={currentLesson} />
          </div>

          <div className="space-y-6">
            {topActions}
            <CourseStats
              modulesCount={course.modules.length}
              totalLessons={getTotalLessons(course)}
            />
            <ModuleList
              modules={course.modules}
              currentLesson={currentLesson}
              showSubmission={showSubmission}
              onLessonSelect={setActiveLesson}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getTotalLessons(course: Course): number {
  return course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0;
}
