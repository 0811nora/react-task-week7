import { toast } from 'react-hot-toast';

export const successNotify = (msg) => toast.success(msg);
export const errorNotify = (msg) => toast.error(msg);