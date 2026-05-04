import Image from 'next/image';
import { useRef, useState } from 'react';

const FileHandler = ({
  onSelectFile,
  url,
  isLoading,
}: {
  onSelectFile: (file: File) => void;
  url: string;
  isLoading: boolean;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(url);
  const inputRef = useRef<HTMLInputElement>(null);

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    onSelectFile(file);
    event.currentTarget.value = '';
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="thumbnail"
        className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Thumbnail"
            className=" rounded-xl"
            height={200}
            width={200}
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01.88-7.9A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, or WEBP (Max. 5MB)</p>
          </div>
        )}

        <input
          onChange={imageHandler}
          onClick={event => {
            event.currentTarget.value = '';
          }}
          ref={inputRef}
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isLoading}
        />
      </label>
    </div>
  );
};

export default FileHandler;
