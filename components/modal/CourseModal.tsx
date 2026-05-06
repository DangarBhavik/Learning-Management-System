const CourseModal = ({ children , title }: { children: React.ReactNode , title: string }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-3xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default CourseModal;
