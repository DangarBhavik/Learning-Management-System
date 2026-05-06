'use client';

import Courses from '@/components/ui/Courses';
import Link from 'next/link';
import CoursesLayout from './CoursesLayout';
import { useCourses } from '@/hooks/courses/useCourses';
import SearchBar from '../ui/SearchBar';
import { useState } from 'react';
import { CourseStatus } from '@/generated/prisma/browser';
import { PrismaUserRole } from '@/types/types';

export default function CoursesPage({ role }: { role: PrismaUserRole }) {
  const [filters, setFilters] = useState<{ search: string; statusFilter: CourseStatus | 'ALL' }>({
    search: '',
    statusFilter: 'ALL',
  });

  const { courses, isFetching } = useCourses({ filter: filters });

  return (
    <CoursesLayout
      role={role}
      title="All Courses"
      headerRight={
        <Link href="/app/add-course">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">+ Add Course</button>
        </Link>
      }
    >
      <SearchBar
        options={[
          { label: 'Pending', value: 'PENDING' },
          { label: 'Draft', value: 'DRAFT' },
          { label: 'Approved', value: 'APPROVED' },
        ]}
        search={filters.search}
        setSearch={search => setFilters({ ...filters, search })}
        statusFilter={filters.statusFilter}
        setStatusFilter={statusFilter => setFilters({ ...filters, statusFilter })}
      />
      {!isFetching ? (
        <Courses btnText="View Course" courses={courses} />
      ) : (
        <p>Loading courses...</p>
      )}
    </CoursesLayout>
  );
}
