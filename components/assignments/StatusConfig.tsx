import {
  BsArrowRepeat,
  BsCheckCircleFill,
  BsClockHistory,
  BsFileEarmarkText,
} from 'react-icons/bs';

const statusConfig = {
  GRADED: {
    label: 'Graded',
    icon: <BsCheckCircleFill className="text-[11px]" />,
    pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    bar: 'bg-emerald-500',
  },
  PENDING: {
    label: 'Pending Review',
    icon: <BsClockHistory className="text-[11px]" />,
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    bar: 'bg-amber-500',
  },
  RESUBMITTED: {
    label: 'Resubmitted',
    icon: <BsArrowRepeat className="text-[11px]" />,
    pill: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    bar: 'bg-sky-500',
  },
  NOT_SUBMITTED: {
    label: 'Not Submitted',
    icon: <BsFileEarmarkText className="text-[11px]" />,
    pill: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    bar: 'bg-gray-300 dark:bg-gray-700',
  },
};
export default statusConfig;
