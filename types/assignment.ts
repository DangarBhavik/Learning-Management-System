import { Submission } from "./submission";

export type Assignment = {
  id: string;
  title: string;
  description: string;
  maxScore: number;
};

export type AssignmentFormProps = {
  submitText: string;
  title?: string;
  description?: string;
  maxScore?: number;
  moduleId: string;
  isPending: boolean;
  onClose: () => void;
  func: ({
    title,
    description,
    maxScore,
  }: {
    title: string;
    description: string;
    maxScore: number;
  }) => Promise<void>;
} & Record<string, unknown>;

export type AssignmentFilter = {
  search: string;
  statusFilter: 'ALL' | 'NOT_SUBMITTED' | 'PENDING' | 'GRADED' | 'RESUBMITTED';
};

export type AssignmentType = {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  maxScore: number;
  moduleTitle: string;
  courseTitle: string;
  submission: {
    status: 'PENDING' | 'GRADED' | 'RESUBMITTED';
    score?: number | null;
  } | null;
};

export type AssignmentSubmission = {
  id: string;
  title: string;
  dueDate: string | null;
  submission?: Submission | null;
};