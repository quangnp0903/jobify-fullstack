import {
  Link,
  Form,
  type ActionFunctionArgs,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import type { QueryClient } from '@tanstack/react-query';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import SubmitBtn from '../components/SubmitBtn';
import type { ApiError } from '../models/Error';

type LoginSubmit = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const errors = useActionData<{ msg?: string }>();

  const loginDemoUser = async () => {
    const data = { email: 'test@test.com', password: 'secret123' };

    try {
      await customFetch.post('/auth/login', data);
      toast.success('take a test drive');

      navigate('/dashboard');
    } catch (error) {
      const apiErr = error as ApiError;

      toast.error(apiErr?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" autoFocus />
        <FormRow name="password" type="password" />
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <SubmitBtn formBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
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
export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as LoginSubmit;
    const errors = { msg: '' } as { msg?: string };

    if (data.password.length < 3) {
      errors.msg = 'password too short';
      return errors;
    }

    try {
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries();

      // toast.success('Login successfully');
      return redirect('/dashboard');
    } catch (error) {
      const apiErr = error as ApiError;

      // toast.error(apiErr?.response?.data?.msg);
      errors.msg = apiErr?.response?.data?.msg;
      return errors;
    }
  };

export default Login;
