import { RefObject } from 'react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { SubmissionTypeSelector } from './SubmissionTypeSelector';
import { FileUploadZone } from './FileUploadZone';
import { GithubLinkInput } from './GithubLinkInput';
import { SubmitButton } from './SubmitButton';

type SubmissionFormProps = {
  submissionType: 'FILE' | 'LINK';
  selectedFile: File | null;
  githubLink: string;
  dragOver: boolean;
  isPending: boolean;
  isSuccess: boolean;
  onSubmissionTypeChange: (type: 'FILE' | 'LINK') => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileClear: () => void;
  onGithubLinkChange: (link: string) => void;
  onDragOver: (value: boolean) => void;
  onDrop: (e: React.DragEvent) => void;
  onSubmit: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
};

export function SubmissionForm({
  submissionType,
  selectedFile,
  githubLink,
  dragOver,
  isPending,
  isSuccess,
  onSubmissionTypeChange,
  onFileChange,
  onFileClear,
  onGithubLinkChange,
  onDragOver,
  onDrop,
  onSubmit,
  fileInputRef,
}: SubmissionFormProps) {
  return (
    <div className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-950/50 px-6 py-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <HiOutlineCloudArrowUp className="text-gray-400 dark:text-gray-500 text-base" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Submit Assignment
        </h2>
      </div>

      <SubmissionTypeSelector value={submissionType} onChange={onSubmissionTypeChange} />

      {submissionType === 'FILE' ? (
        <FileUploadZone
          selectedFile={selectedFile}
          dragOver={dragOver}
          isPending={isPending}
          onFileChange={onFileChange}
          onFileClear={onFileClear}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fileInputRef={fileInputRef}
        />
      ) : (
        <GithubLinkInput value={githubLink} onChange={onGithubLinkChange} isPending={isPending} />
      )}

      <SubmitButton
        isPending={isPending}
        isSuccess={isSuccess}
        isDisabled={
          (submissionType === 'FILE' && !selectedFile) || (submissionType === 'LINK' && !githubLink)
        }
        onSubmit={onSubmit}
        onClear={onFileClear}
        selectedFile={selectedFile}
      />
    </div>
  );
}
