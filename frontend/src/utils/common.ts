import { toast } from 'react-toastify';

import type { ApiError } from '../models/Error';

export const handleApiErr = (error: unknown) => {
  const apiErr = error as ApiError;
  
  toast.error(apiErr?.response?.data?.msg);
  return apiErr;
};
