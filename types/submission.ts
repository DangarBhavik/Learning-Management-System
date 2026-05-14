export const SubmissionStatus = {
  PENDING: 'PENDING',
  GRADED: 'GRADED',
  RESUBMITTED: 'RESUBMITTED'
} as const

export type SubmissionStatus = (typeof SubmissionStatus)[keyof typeof SubmissionStatus]

export type SubmissionWithRelations = {
  id: string;
  fileId: string | null;

  file: {
    id: string;
    url: string;
    public_id: string;
  } | null;
  githubLink: string | null;
  score: number | null;
  status: 'PENDING' | 'GRADED' | 'RESUBMITTED';
  submittedAt: Date;

  student: {
    username: string;
    mentor?: {
      username: string;
    } | null;
  };

  assignment: {
    id: string;
    title: string;
    module?: {
      course?: {
        title: string;
      } | null;
    } | null;
  };
};

export type SubmissionResponse = {
  id: string;
  file: {
    id: string;
    url: string;
    public_id: string;
  } | null;
  githubLink: string | null;
  score: number | null;
  status: string;
  submittedAt: Date;

  student: {
    name: string;
    mentorName: string;
  };

  assignment: {
    id: string;
    title: string;
  };

  course: {
    title: string;
  };
};
export type Submission = {
  status: 'PENDING' | 'GRADED' | 'RESUBMITTED';
  score: number | null;
};

export type SubmissionType = {
  id: string;
  file: {
    id: string;
    url: string;
    public_id: string;
  } | null;
  githubLink?: string;
  score?: number | null;
  feedback?: string | null;
  status: SubmissionStatus;
  isActive: boolean;
  submittedAt: string;
  gradedAt?: string | null;
  assignmentId: string;
  studentId: string;
  assignment: {
    id: string;
    title: string;
    description: string;
    dueDate?: string | null;
    maxScore: number;
    module: {
      id: string;
      title: string;
      course: {
        id: string;
        title: string;
      };
    };
  };
  student: {
    id: string;
    username: string;
    email: string;
    image: string;
  };
};