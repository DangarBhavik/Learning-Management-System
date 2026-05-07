import { AssignmentType } from './Assignments';
import statusConfig from './StatusConfig';
import Link from 'next/link';
import { BsFileEarmarkText } from 'react-icons/bs';
import {
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiArrowRight,
} from 'react-icons/hi2';
import ScoreBar from './ScoreBar';

export default function AssignmentCard({ item, index }: { item: AssignmentType; index: number }) {
  const statusKey = (item.submission?.status ?? 'NOT_SUBMITTED') as keyof typeof statusConfig;

  const isGraded = item.submission?.status === 'GRADED';
  const cfg = statusConfig[statusKey] ?? statusConfig.NOT_SUBMITTED;
  const isOverdue = !isGraded && item.dueDate && new Date(item.dueDate) < new Date();

  return (
    <div
      className="group relative flex flex-col sm:flex-row sm:items-center gap-4
                   rounded-2xl border border-gray-200/70 dark:border-gray-800
                   bg-white dark:bg-gray-950/50
                   backdrop-blur-sm px-5 py-4
                   shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700
                   transition-all duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className={`absolute left-0 top-3 bottom-3 w-0.75 rounded-full ${cfg.bar}`} />

      <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center text-gray-400 dark:text-gray-500 text-base">
        <BsFileEarmarkText />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</span>

          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.pill}`}
          >
            {cfg.icon}
            {cfg.label}
          </span>

          {isOverdue && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Overdue
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
          <span className="inline-flex items-center gap-1">
            <HiOutlineBookOpen className="text-xs" />
            {item.courseTitle}
          </span>

          <span className="text-gray-300 dark:text-gray-700">·</span>

          <span className="inline-flex items-center gap-1">
            <HiOutlineAcademicCap className="text-xs" />
            {item.moduleTitle}
          </span>

          {item.dueDate && (
            <>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span
                className={`inline-flex items-center gap-1 ${
                  isOverdue ? 'text-red-500 dark:text-red-400 font-semibold' : ''
                }`}
              >
                <HiOutlineCalendar className="text-xs" />
                {new Date(item.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="hidden sm:flex flex-col gap-1 w-36 shrink-0">
        <div className="flex items-center gap-1 text-[10px] font-semibold uppercase text-gray-400 dark:text-gray-500">
          <HiOutlineStar className="text-xs" />
          {isGraded ? 'Score' : 'Max score'}
        </div>

        {isGraded && item.submission?.score != null ? (
          <ScoreBar score={item.submission.score} max={item.maxScore} />
        ) : (
          <span className="text-xs font-semibold text-gray-300 dark:text-gray-600">
            — / {item.maxScore}
          </span>
        )}
      </div>

      <div>
        <Link
          href={`/app/assignments/${item.id}`}
          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold ${
            isGraded
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
          }`}
        >
          {isGraded ? 'View Feedback' : 'Submit'}
          <HiArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
