import {
  Form,
  useNavigation,
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom';
import styled from 'styled-components';

import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import type { ApiError } from '../models/Error';
import type { User } from '../models/User';

type AddJobSubmit = {
  company: string;
  position: string;
  jobType: string;
  jobLocation: string;
  jobStatus: string;
};

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

const Wrapper = styled.section`
  background: var(--background-secondary-color);
  padding: 3rem 2rem 2rem 2rem;

  form {
    display: block;
    max-width: unset;
    width: unset;
    padding: 0;
    background: unset;
    border-radius: unset;
    box-shadow: unset;
    margin: 2rem auto;
  }

  .btn-block {
    margin-top: 1rem;
    padding: 0.62rem 0.75rem;
  }

  @media screen and (min-width: 992px) {
    padding-bottom: 1rem;

    form {
      display: grid;
      column-gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }

    .btn-block {
      align-self: center;
    }
  }

  @media screen and (min-width: 1120px) {
    form {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as AddJobSubmit;

  try {
    await customFetch.post('/jobs', data);

    toast.success('Job added successfully');
    return null;
  } catch (error) {
    const apiErr = error as ApiError;

    toast.error(apiErr?.response?.data?.msg);
    return apiErr;
  }
};

export default AddJob;
