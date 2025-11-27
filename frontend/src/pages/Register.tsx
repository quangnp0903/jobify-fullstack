import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login">Login Page</Link>
    </div>
  );
};

export default Register;
