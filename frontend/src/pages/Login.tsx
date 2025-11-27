import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/register">Register Page</Link>
    </div>
  );
};

export default Login;
