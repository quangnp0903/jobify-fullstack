import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom';
// import styled from 'styled-components';

import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import type { User } from '../models/User';
import type { JobSubmitData } from '../models/Job';
import { handleApiErr } from '../utils/common';
import Wrapper from '../assets/wrappers/DashboardForm';

type DashboardOutletContext = {
  user: User;
};

const AddJob: React.FC = () => {
  const { user } = useOutletContext<DashboardOutletContext>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <h4>add job</h4>
      <Form method="post" className="form">
        <FormRow name="position" type="text" />
        <FormRow name="company" type="text" />
        <FormRow
          name="jobLocation"
          type="text"
          labelText="job location"
          defaultValue={user.location}
        />
        <FormRowSelect
          name="jobStatus"
          labelText="job status"
          defaultValue={JOB_STATUS.PENDING}
          list={Object.values(JOB_STATUS)}
        />
        <FormRowSelect
          name="jobType"
          labelText="job type"
          defaultValue={JOB_TYPE.FULL_TIME}
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
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as JobSubmitData;

  try {
    await customFetch.post('/jobs', data);

    toast.success('Job added successfully');
    return redirect('all-jobs');
  } catch (error) {
    handleApiErr(error);
  }
};

export default AddJob;
