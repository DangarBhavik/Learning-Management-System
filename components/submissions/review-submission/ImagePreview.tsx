import Image from 'next/image';
const ImagePreview = ({ url }: { url: string }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
      <Image
        src={url}
        alt="Submission preview"
        width={500}
        height={500}
        className="object-contain w-full"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority={false}
      />
    </div>
  );
};
export default ImagePreview;
