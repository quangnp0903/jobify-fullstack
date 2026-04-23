import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { QueryClient, useQuery } from '@tanstack/react-query';

import { BigSidebar, SmallSidebar, Navbar } from '../components';
import { checkDefaultTheme } from '../App';
import type { User } from '../models/User';
import customFetch from '../utils/customFetch';
import Loading from '../components/Loading';
import type { AxiosError } from 'axios';

type DashboardCtxObj = {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
  // queryClient?: QueryClient;
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
  (queryClient: QueryClient) =>
  async (): Promise<DashboardLoaderData | Response> => {
    try {
      return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
      const apiErr = error as AxiosError;
      if (apiErr?.response?.status === 401) {
        return redirect('/');
      }
      throw error;
    }
  };

const DashboardContext = createContext<DashboardCtxObj | null>(null);

const DashboardLayout: React.FC<{ queryClient: QueryClient }> = ({
  queryClient,
}) => {
  const { data } = useQuery<DashboardLoaderData>(userQuery);
  const { user } = data!;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;

    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme.toString());
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = useCallback(async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    // toast.success('Logging out...');
  }, [navigate, queryClient]);

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError, logoutUser]);

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
export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);

  if (!ctx) {
    throw new Error('useDashboardContext must be used within DashboardLayout');
  }

  return ctx;
};

export default DashboardLayout;
