import {
  Link,
  Form,
  type ActionFunctionArgs,
  redirect,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch';
import { handleApiErr } from '../utils/common';
import SubmitBtn from '../components/SubmitBtn';

const Register: React.FC = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);

    toast.success('Register successfully');
    return redirect('/login');
  } catch (error) {
    handleApiErr(error);
  }
};

export default Register;
