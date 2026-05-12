import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getInitials from '@/utils/getInitials';

interface StudentInfoProps {
  student: {
    username: string;
    email: string;
    image?: string;
  };
}

const StudentInfo = ({ student }: StudentInfoProps) => {
  const studentInitials = getInitials(student?.username, { fallback: 'U' });

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800/70 bg-white dark:bg-gray-950/60 shadow-sm overflow-hidden">
      <div className="relative border-b border-gray-100 dark:border-gray-800 px-6 py-5 flex items-center gap-3">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-emerald-400 to-teal-500 rounded-r-full" />
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">Student Information</h2>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-violet-400 to-indigo-500 opacity-20 blur-sm scale-110" />
            <Avatar size="lg" className="relative ring-2 ring-white dark:ring-gray-900">
              {student?.image ? (
                <AvatarImage src={student.image} alt={student.username} />
              ) : (
                <AvatarFallback className="bg-linear-to-br from-violet-500 to-indigo-600 text-white font-bold">
                  {studentInitials}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-gray-900 dark:text-white truncate">
              {student.username}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-1">
              {student.email}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 px-3 py-1.5 text-[10px] font-bold tracking-wide text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Student
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
