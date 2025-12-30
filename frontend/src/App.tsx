import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  DashboardLayout,
  HomeLayout,
  Landing,
  Login,
  Register,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';

// eslint-disable-next-line react-refresh/only-export-components
export const checkDefaultTheme = () => {
  const isDarkTheme = Boolean(localStorage.getItem('darkTheme')) === true;

  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Stats />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
