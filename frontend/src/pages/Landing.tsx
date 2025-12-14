import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import Wrapper from '../assets/wrappers/LandingPage';

import Logo from '../components/Logo';

import main from '../assets/images/main.svg';

const Landing: React.FC = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  nav {
    margin: 0 auto;
    width: var(--fluid-width);
    max-width: var(--max-width);
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    span {
      color: var(--primary-500);
    }
  }

  p {
    color: var(--text-secondary-color);
    line-height: 2;
    max-width: 35em;
    margin-bottom: 1.5rem;
  }

  .register-link {
    margin-right: 1rem;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  .main-img {
    display: none;
  }

  @media screen and (min-width: 992px) {
    .main-img {
      display: block;
      width: 400px;
    }
  }
`;

export default Landing;
