import {
  Form,
  redirect,
  useLoaderData,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import type { Job, JobSubmitData } from '../models/Job';
import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/DashboardForm';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';

const EditJob: React.FC = () => {
  const navigation = useNavigation();
  const { job } = useLoaderData<{ job: Job }>();

  const isSubmitting = navigation.state === 'submitting';
  // console.log({ job });

  return (
    <Wrapper>
      <h4>add job</h4>
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
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { jobId } = params;
    const { data } = await customFetch.get<Job>(`/jobs/${jobId}`);

    return data;
  } catch (error) {
    handleApiErr(error);
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as JobSubmitData;

    await customFetch.patch(`/jobs/${params.jobId}`, data);
    toast.success('Job edited successfully');

    return redirect('../all-jobs');
  } catch (error) {
    handleApiErr(error);
  }
};

export default EditJob;
