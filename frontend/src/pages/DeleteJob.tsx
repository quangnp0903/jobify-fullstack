import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';

const DeleteJob: React.FC = () => {
  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      await customFetch.delete(`/jobs/${params.jobId}`);

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job deleted successfully');

      return redirect('../all-jobs');
    } catch (error) {
      handleApiErr(error);
    }
  };

export default DeleteJob;
