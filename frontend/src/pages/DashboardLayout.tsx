import { createContext, useContext, useState } from 'react';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BigSidebar, SmallSidebar, Navbar } from '../components';
import { checkDefaultTheme } from '../App';
import type { User } from '../models/User';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

type DashboardCtxObj = {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
};

type DashboardLoaderData = {
  user: User;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async (): Promise<DashboardLoaderData> => {
  try {
    const { data } = await customFetch.get<DashboardLoaderData>(
      '/users/current-user'
    );

    return data;
  } catch (error) {
    throw redirect('/');
  }
};

const DashboardContext = createContext<DashboardCtxObj>({
  user: {
    _id: '',
    name: '',
    email: '',
    lastName: '',
    location: '',
    role: '',
    avatar: '',
  },
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
});

const DashboardLayout: React.FC = () => {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;

    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme.toString());
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media screen and (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
