import { createContext, useContext, useState } from 'react';
import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, type QueryClient } from '@tanstack/react-query';

import { BigSidebar, SmallSidebar, Navbar } from '../components';
import { checkDefaultTheme } from '../App';
import type { User } from '../models/User';
import customFetch from '../utils/customFetch';
import Loading from '../components/Loading';

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

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const response = await customFetch.get('/users/current-user');
    return response.data;
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient: QueryClient) => async (): Promise<DashboardLoaderData> => {
    try {
      const data =
        await queryClient.ensureQueryData<DashboardLoaderData>(userQuery);

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

const DashboardLayout: React.FC<{ queryClient: QueryClient }> = ({
  queryClient,
}) => {
  const { data } = useQuery<DashboardLoaderData>(userQuery);
  const { user } = data!;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === 'loading';
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
    queryClient.invalidateQueries();
    // toast.success('Logging out...');
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
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
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
