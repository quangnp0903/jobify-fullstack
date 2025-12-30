import {
  Link,
  Form,
  type ActionFunctionArgs,
  redirect,
  useNavigation,
} from 'react-router-dom';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import type { ApiError } from '../models/Error';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
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
    await customFetch.post('/auth/login', data);

    toast.success('Login successfully');
    return redirect('/dashboard');
  } catch (error) {
    const apiErr = error as ApiError;

    toast.error(apiErr?.response?.data?.msg);
    return apiErr;
  }
};

export default Login;
