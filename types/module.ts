import { Assignment, AssignmentSubmission } from "./assignment";

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
  assignments: Assignment[];
};

export type Lesson = {
  id: string;
  title: string;
  content: string | null;
};

export type ModuleWithAssignment = {
  id: string;
  title: string;
  lessons: Lesson[];
  assignments: AssignmentSubmission[];
};