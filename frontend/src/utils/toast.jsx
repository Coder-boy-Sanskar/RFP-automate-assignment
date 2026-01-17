import { toast } from 'react-toastify';

const config = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const notify = {
  success: (message) => toast.success(message, config),
  error: (message) => toast.error(message, config),
  info: (message) => toast.info(message, config),
  warning: (message) => toast.warn(message, config),
};