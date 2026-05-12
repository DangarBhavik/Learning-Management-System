import FilePreview from './FilePreview';
import ImagePreview from './ImagePreview';
import OpenButton from './OpenButton';
import PdfPreview from './PdfPreview';
import VideoPreview from './VideoPreview';

const SubmissionPreview = ({ url }: { url: string }) => {
  const cleanUrl = url.split('?')[0].toLowerCase();

  const isImage = /\.(png|jpe?g|webp|gif|svg)$/.test(cleanUrl);
  const isPdf = cleanUrl.endsWith('.pdf');
  const isVideo = /\.(mp4|webm|ogg|mov)$/.test(cleanUrl);
  const isZip = /\.(zip|rar|7z)$/.test(cleanUrl);

  return (
    <div className="space-y-5">
      {isImage ? (
        <ImagePreview url={url} />
      ) : isPdf ? (
        <PdfPreview url={url} />
      ) : isVideo ? (
        <VideoPreview url={url} />
      ) : (
        <FilePreview type={isZip ? 'zip' : 'other'} url={url} />
      )}

      <OpenButton url={url} />
    </div>
  );
};

export default SubmissionPreview;
