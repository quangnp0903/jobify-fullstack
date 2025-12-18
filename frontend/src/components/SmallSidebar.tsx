import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSidebar: React.FC = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <button className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  .sidebar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }

  .content {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    align-items: center;
    width: var(--fluid-width);
    height: 95vh;
    padding: 4rem 2rem;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  }

  .nav-link {
    margin-bottom: 2rem;
    color: var(--text-secondary-color);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    transition: var(--transition);

    &:hover {
      color: var(--primary-500);
    }

    &.active {
      color: var(--primary-500);
    }
  }

  .icon {
    display: grid;
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

export default SmallSidebar;
