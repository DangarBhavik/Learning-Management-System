import { X } from 'lucide-react';

const Modal = ({
  children,
  title,
  onClose,
  classes,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  classes?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 ">
      <div className={`bg-gray-100 dark:bg-gray-700 p-6 rounded-3xl shadow-lg ${classes} `}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <X onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
