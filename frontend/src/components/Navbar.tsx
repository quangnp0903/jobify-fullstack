import { FaAlignLeft } from 'react-icons/fa';
import styled from 'styled-components';

import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 0 0;
  background: var(--background-secondary-color);

  .nav-center {
    display: flex;
    width: 90vw;
    justify-content: space-between;
    align-items: center;
  }

  .toggle-btn {
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    display: flex;
    /* align-items: center; */
  }

  .logo {
    width: 100px;
    display: flex;
    /* align-items: center; */
  }

  .logo-text {
    display: none;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: block;
    }

    .btn-container {
      /* display: flex;
      align-items: center; */
    }
  }
`;

export default Navbar;
