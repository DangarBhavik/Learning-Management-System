'use client';
import Courses from '@/components/ui/Courses';
import Loading from '@/components/ui/loading';
import { fetchCourses } from '@/services/apis/courses';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  image: string;
  status: string;
  authorId: string;
  thumbnailId: string | null;
  createdAt: string;
  updatedAt: string;
  modulesCount: number;
};

function Page() {
  const { data: courses = [], isPending } = useQuery<Course[]>({
    queryKey: ['mentor-courses'],
    queryFn: fetchCourses,
  });

  if (isPending) {
    return <Loading text="Courses" />;
  }

  return (
    <div className="mx-8 space-y-5 mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Courses</h2>
        <Link href="/add-course">
          <button className="bg-blue-500 text-white rounded-md px-2 py-1 ">+ Add Course</button>
        </Link>
      </div>
      <Courses btnText="Manage Course" courses={courses} />
    </div>
  );
}

export default Page;
