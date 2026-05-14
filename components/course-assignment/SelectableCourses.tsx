'use client';
import { CourseAssign } from '@/types/course';
import SelectableCourse from './SelectableCourse';

const SelectableCourses = ({
  classes,
  courses,
  func,
  selectedCourses = [],
}: {
  classes ?: string;
  courses: CourseAssign[];
  func: (course: CourseAssign) => void;
  selectedCourses?: CourseAssign[];
}) => {
  return (
    <ul className={`grid grid-cols-1  md:grid-cols-2 xl:grid-cols-5 gap-6 ${classes}`}>
      {courses &&
        courses.map(course => {
          const isSelected = selectedCourses.some(selected => selected.id === course.id);
          return (
            <li key={course.id}>
              <SelectableCourse
                course={course}
                isSelected={isSelected}
                onCheckboxChange={func.bind(null, course)}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default SelectableCourses;
