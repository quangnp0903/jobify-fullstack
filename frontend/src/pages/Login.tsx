import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';

const Login: React.FC = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <button type="submit" className="btn btn-block">
          submit
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
      </form>
    </Wrapper>
  );
};

export default Login;
