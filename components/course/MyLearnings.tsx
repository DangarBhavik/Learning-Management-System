'use client';
import useGetAssignedCourses from '@/hooks/courses/useGetAssignedCourses';
import CoursesLayout from './CoursesLayout';
import Courses from '../ui/Courses';
import CustomPagination from '../ui/CustomPagination';
import { useState } from 'react';
import SearchBar from '../ui/SearchBar';

const MyLearningsPage = ({ selectedUserId }: { selectedUserId: string }) => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');

  const { courses, paginationData, isLoading, isFetching } = useGetAssignedCourses({
    userId: selectedUserId,
    page: page,
    search: search,
  });

  return (
    <CoursesLayout title="My Learnings" count={courses.length || 0}>
      {isLoading ? (
        <p className="h-full">Loading....</p>
      ) : (
        <div className={`${isFetching && 'animate-pulse opacity-90'}`}>
          <SearchBar search={search} setSearch={val => setSearch(val)} />

          {courses.length > 0 && <Courses courses={courses} btnText="View Course" />}
          <CustomPagination
            getNextPage={() => setPage(prev => prev + 1)}
            getPreviousPage={() => setPage(prev => prev - 1)}
            paginationData={paginationData}
          />
        </div>
      )}
    </CoursesLayout>
  );
};

export default MyLearningsPage;
