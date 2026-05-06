import { courseFormData } from '@/types/types';
import { useState } from 'react';
import FileHandler from '../FileHander';
import NavLink from '../NavLink';

const CourseCreateForm = ({
  func,
  isLoading,
  id,
  title,
  description,
  url,
}: {
  func: (formData: courseFormData) => Promise<void>;
  isLoading: boolean;
  id?: string;
  title?: string;
  description?: string;
  url?: string;
}) => {
  const [formData, setFormData] = useState<courseFormData>({
    title: title || '',
    description: description || '',
    thumbnail: null,
  });

  const onChangeHandler = (identifier: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.title || !formData.description || (!formData.thumbnail && !url)) {
      return;
    }

    if (
      formData.title == title &&
      formData.description == description &&
      !formData.thumbnail &&
      !url
    ) {
      return;
    }
    await func(formData);
  };

  const isDisabled =
    isLoading ||
    formData.title == title ||
    formData.description == description ||
    !formData.thumbnail;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Course Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={event => onChangeHandler('title', event.target.value)}
          placeholder="e.g., Mastering Next.js"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition bg-white dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Course Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={event => onChangeHandler('description', event.target.value)}
          rows={4}
          placeholder="Write a short description about your course..."
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition resize-none bg-white dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Course Thumbnail
        </label>

        <FileHandler
          onSelectFile={(file: File) => onChangeHandler('thumbnail', file)}
          isLoading={isLoading}
          url={url || ''}
        />
      </div>

      <div className="flex justify-end pt-4 gap-4">
        {id && <NavLink href={`./${id}/content`} label="Next Page" />}
        <button
          disabled={isDisabled}
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:hover:bg-blue-600 shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition"
        >
          {isLoading ? 'Creating Course....' : 'Save & Continue'}
        </button>
      </div>
    </form>
  );
};

export default CourseCreateForm;
