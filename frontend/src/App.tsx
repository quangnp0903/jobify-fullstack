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
  EditJob,
  Admin,
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { loader as layoutLoader } from './pages/DashboardLayout';
import { loader as allJobsLoader } from './pages/AllJobs';
import {
  loader as editJobLoader,
  action as editJobAction,
} from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';
import AdminError from './pages/AdminError';

// eslint-disable-next-line react-refresh/only-export-components
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

  // document.body.classList.toggle('dark-theme', isDarkTheme);
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
        loader: layoutLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'edit-job/:jobId',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:jobId',
            action: deleteJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
            errorElement: <AdminError />,
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
