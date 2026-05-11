'use client';

import Courses from '@/components/ui/Courses';
import Link from 'next/link';
import CoursesLayout from './CoursesLayout';
import { useCourses } from '@/hooks/courses/useCourses';
import SearchBar from '../ui/SearchBar';
import { useState } from 'react';
import { CourseStatus, PrismaUserRole } from '@/types/types';
import CustomPagination from '../ui/CustomPagination';

export default function CoursesPage({ role }: { role: PrismaUserRole }) {
  const [filters, setFilters] = useState<{ search: string; statusFilter: CourseStatus | 'ALL' }>({
    search: '',
    statusFilter: 'ALL',
  });

  const [page, setPage] = useState(1);

  const { courses, isFetching, pagination } = useCourses({ filter: filters, limit: 6, page: page });

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
          { label: 'All', value: 'ALL' },
          { label: 'Pending', value: 'PENDING' },
          { label: 'Draft', value: 'DRAFT' },
          { label: 'Approved', value: 'APPROVED' },
        ]}
        search={filters.search}
        setSearch={search => setFilters({ ...filters, search })}
        statusFilter={filters.statusFilter}
        setStatusFilter={statusFilter =>
          setFilters({ ...filters, statusFilter: statusFilter as CourseStatus | 'ALL' })
        }
      />
      {!isFetching ? (
        <>
          <Courses btnText="View Course" courses={courses} />
          <CustomPagination
            paginationData={pagination}
            getNextPage={() => setPage(prev => prev + 1)}
            getPreviousPage={() => setPage(prev => prev - 1)}
          />
        </>
      ) : (
        <p className="text-gray-500 flex min-h-80 items-center justify-center">
          Loading courses...
        </p>
      )}
    </CoursesLayout>
  );
}
