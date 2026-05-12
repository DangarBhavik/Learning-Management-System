import { BsFileEarmarkText } from 'react-icons/bs';
import BackButton from './BackButton';

const NotFoundState = () => {
  return (
    <section className="mx-8 mt-7 flex flex-col items-center justify-center py-32 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
        <BsFileEarmarkText className="text-2xl text-gray-400" />
      </div>
      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Submission not found</p>
      <BackButton />
    </section>
  );
};
export default NotFoundState;
