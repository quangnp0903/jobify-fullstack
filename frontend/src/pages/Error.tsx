import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

// import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

type Error = {
  status?: number;
};

const Error: React.FC = () => {
  const error = useRouteError() as Error;

  console.log('error', error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! Page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;

  img {
    width: 90vw;
    max-width: 600px;
    margin-top: -3rem;
    margin-bottom: 2rem;
    display: block;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

export default Error;
