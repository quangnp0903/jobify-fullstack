import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, type QueryClient } from '@tanstack/react-query';

import type { Job, JobSubmitData } from '../models/Job';
import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/DashboardForm';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import SubmitBtn from '../components/SubmitBtn';

const editJobQuery = (jobId?: string) => ({
  queryKey: ['job', jobId] as const,
  queryFn: async () => {
    const { data } = await customFetch.get<{ job: Job }>(`/jobs/${jobId}`);
    return data;
  },
});

const EditJob: React.FC = () => {
  const jobId = useLoaderData<string>();
  const { data } = useQuery<{ job: Job }>(editJobQuery(jobId));

  if (!data) return null;

  const { job } = data;

  // console.log({ job });
  return (
    <Wrapper>
      <h4>update job</h4>
      <Form method="post" className="form">
        <FormRow name="position" type="text" defaultValue={job.position} />
        <FormRow name="company" type="text" defaultValue={job.company} />
        <FormRow
          name="jobLocation"
          type="text"
          labelText="job location"
          defaultValue={job.jobLocation}
        />
        <FormRowSelect
          name="jobStatus"
          labelText="job status"
          defaultValue={job.jobStatus}
          list={Object.values(JOB_STATUS)}
        />
        <FormRowSelect
          name="jobType"
          labelText="job type"
          defaultValue={job.jobType}
          list={Object.values(JOB_TYPE)}
        />
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { jobId } = params;
    await queryClient.ensureQueryData(editJobQuery(jobId));

    return jobId;
  };

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData) as JobSubmitData;

      await customFetch.patch(`/jobs/${params.jobId}`, data);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job edited successfully');

      return redirect('../all-jobs');
    } catch (error) {
      handleApiErr(error);
    }
  };

export default EditJob;
