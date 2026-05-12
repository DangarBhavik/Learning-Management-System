import { BsFileEarmarkText } from 'react-icons/bs';
import BackButton from './BackButton';

const ErrorState = () => {
  return (
    <section className="mx-8 mt-7 flex flex-col items-center justify-center py-32 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/40 ring-1 ring-red-200 dark:ring-red-900">
        <BsFileEarmarkText className="text-2xl text-red-500" />
      </div>
      <p className="text-sm font-bold text-red-600 dark:text-red-400">Failed to load submission</p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Something went wrong. Please try again.
      </p>
      <BackButton />
    </section>
  );
};
export default ErrorState;
