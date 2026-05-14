export const FileType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  OTHER: 'OTHER'
} as const;

export type FileType = (typeof FileType)[keyof typeof FileType];