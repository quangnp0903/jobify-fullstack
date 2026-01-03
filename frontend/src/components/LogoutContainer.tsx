import { useState } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  const toggleDropdown = () => {
    setShowLogout(!showLogout);
  };

  return (
    <Wrapper>
      <button onClick={toggleDropdown} className="btn logout-btn">
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        <span className="username">{user?.name}</span>
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? 'show-dropdown' : ''}`}>
        <button className="dropdown-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    visibility: hidden;
    border-radius: var(--border-radius);
    background: var(--primary-500);
    text-align: center;
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
  }
`;

export default LogoutContainer;
