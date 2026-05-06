'use client';

import ModuleInput from './ModuleInput';
import Assignments from '../assignment/Asssignments';
import Lessons from '../lesson/Lessons';
import { Assignment, Lesson } from '@/types/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CourseAction from '../CourseAction';

type ModuleFormEditProps = {
  id: string;
  title: string;
  index: number;
  lessons: Lesson[];
  assignments: Assignment[];
};

const Modules: React.FC<ModuleFormEditProps> = ({ id, index, title, lessons, assignments }) => {
  return (
    <Card className="border dark:bg-[#1e2939] shadow-none hover:shadow-lg dark:hover:shadow-black/40 transition mb-6">
      <CardHeader className="border-b border-slate-300/60  dark:border-slate-700">
        <ModuleInput index={index} title={title} moduleId={id} />
      </CardHeader>
      <CardContent className="space-y-6">
        <Lessons lessons={lessons} moduleId={id} />
        <Assignments assignments={assignments} moduleId={id} />
        <CourseAction moduleId={id} />
      </CardContent>
    </Card>
  );
};

export default Modules;
