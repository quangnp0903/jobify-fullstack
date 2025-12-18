import styled from 'styled-components';

// import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSizeBar: React.FC = () => {
  // const { showSidebar } = useDashboardContext();
  const showSidebar = true;

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: none;

  @media screen and (min-width: 992px) {
    display: block;
    box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.1);
    .sidebar-container {
      width: 250px;
      background: var(--background-secondary-color);
      min-height: 100vh;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }

    .show-sidebar {
      margin-left: 0;
    }

    .content {
      position: sticky;
      padding-left: 2.5rem;
      top: 0;
    }

    header {
      height: 6rem;
      display: flex;
      align-items: center;
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
      transition: padding-left 0.3s ease-in-out;

      &:hover {
        padding-left: 0.5rem;
        color: var(--primary-500);
        transition: var(--transition);
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
  }
`;

export default BigSizeBar;
