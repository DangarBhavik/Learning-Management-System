const VideoPreview = ({ url }: { url: string }) => {
  return (
    <video controls className="w-full rounded-xl border border-gray-100 dark:border-gray-800">
      <source src={url} />
    </video>
  );
};
export default VideoPreview;
