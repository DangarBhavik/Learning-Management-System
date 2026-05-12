const PdfPreview = ({ url }: { url: string }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 h-[600px]">
      {/* <iframe src={`${url}#notoolbar`} className="w-full h-full" title="PDF Preview" /> */}
      <iframe
        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
        className="w-full h-full"
        title="PDF Preview"
      />
    </div>
  );
};
export default PdfPreview;
