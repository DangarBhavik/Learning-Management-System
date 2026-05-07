'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useMutation } from '@tanstack/react-query';

import queryClient from '@/utils/query-client';
import { reactivateCourse } from '@/services/apis/courses';

export default function ReactivateCourseButton({ courseId }: { courseId: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: reactivateCourse,

    onSuccess: () => {
      //   toast.success('Course reactivated successfully');

      queryClient.invalidateQueries({
        queryKey: ['courses', courseId],
      });

      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
    },

    onError: (error: Error) => {
      //   toast.error(error.message);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="
      flex items-center justify-center gap-2
      px-4 py-2 rounded-xl
      bg-green-50 dark:bg-green-900/80
      border border-green-200 dark:border-green-800
      text-green-600 dark:text-green-400
      font-medium text-sm
      hover:bg-green-100 dark:hover:bg-green-900/90
      transition cursor-pointer
    "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reactivate
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reactivate this course?</AlertDialogTitle>

          <AlertDialogDescription>
            This course will become visible to users again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={isPending} onClick={() => mutate(courseId)}>
            {isPending ? 'Updating...' : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
