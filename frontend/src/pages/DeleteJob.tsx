import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';

import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';

const DeleteJob: React.FC = () => {
  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params }: ActionFunctionArgs) => {
  try {
    await customFetch.delete(`/jobs/${params.jobId}`);
    toast.success('Job deleted successfully');

    return redirect('../all-jobs');
  } catch (error) {
    handleApiErr(error);
  }
};

export default DeleteJob;
