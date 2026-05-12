import Link from 'next/link';

const OpenButton = ({ url }: { url: string }) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-5 py-3 text-xs font-bold bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-90 transition-all duration-150"
    >
      Open submission ↗
    </Link>
  );
};
export default OpenButton;
