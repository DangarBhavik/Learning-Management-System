import { toast } from 'sonner';

const createToast = (message: string, type: 'success' | 'error' | 'info') => {
  if (type === 'success') {
    toast.success(message, { position: 'bottom-right' });
  }
  if (type === 'error') {
    toast.error(message, { position: 'bottom-right' });
  }
  if (type === 'info') {
    toast(message, { position: 'bottom-right' });
  }
};

export default createToast;
