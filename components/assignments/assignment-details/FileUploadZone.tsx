import { RefObject } from 'react';
import { HiOutlineCloudArrowUp, HiCheckCircle } from 'react-icons/hi2';
import { HiOutlineXCircle } from 'react-icons/hi2';

const ACCEPTED = '.pdf,.zip,.png,.jpg,.jpeg';
const ACCEPTED_LABEL = 'PDF, ZIP, PNG, JPG';

type FileUploadZoneProps = {
  selectedFile: File | null;
  dragOver: boolean;
  isPending: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileClear: () => void;
  onDragOver: (value: boolean) => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
};

export function FileUploadZone({
  selectedFile,
  dragOver,
  isPending,
  onFileChange,
  onFileClear,
  onDragOver,
  onDrop,
  fileInputRef,
}: FileUploadZoneProps) {
  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={e => {
        e.preventDefault();
        onDragOver(true);
      }}
      onDragLeave={() => onDragOver(false)}
      onDrop={onDrop}
      className={`
        relative flex flex-col items-center justify-center gap-2
        rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer
        transition-all duration-200 select-none
        ${
          dragOver
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30'
            : selectedFile
              ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-900/30'
        }
      `}
    >
      {selectedFile ? (
        <>
          <HiCheckCircle className="text-2xl text-emerald-500" />
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 text-center">
            {selectedFile.name}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            {(selectedFile.size / 1024).toFixed(1)} KB · Click to change
          </p>
        </>
      ) : (
        <>
          <HiOutlineCloudArrowUp className="text-2xl text-gray-300 dark:text-gray-600" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
            Drag & drop a file here, or{' '}
            <span className="text-indigo-500 dark:text-indigo-400 font-semibold">browse</span>
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">{ACCEPTED_LABEL}</p>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED}
        onChange={onFileChange}
        className="sr-only"
        disabled={isPending}
      />
    </div>
  );
}
