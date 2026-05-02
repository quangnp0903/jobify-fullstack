import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const [{ default: HomeLayout }, { default: Error }] = await Promise.all([
        import('./pages/HomeLayout'),
        import('./pages/Error'),
      ]);

      return {
        Component: HomeLayout,
        ErrorBoundary: Error,
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Landing } = await import('./pages/Landing');
          return { Component: Landing };
        },
      },
      {
        path: 'register',
        lazy: async () => {
          const { default: Register, action } = await import('./pages/Register');
          return {
            Component: Register,
            action,
          };
        },
      },
      {
        path: 'login',
        lazy: async () => {
          const { default: Login, action } = await import('./pages/Login');
          return {
            Component: Login,
            action: action(queryClient),
          };
        },
      },
      {
        path: 'dashboard',
        lazy: async () => {
          const { default: DashboardLayout, loader } = await import(
            './pages/DashboardLayout'
          );

          return {
            Component: () => <DashboardLayout queryClient={queryClient} />,
            loader: loader(queryClient),
          };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { default: AddJob, action } = await import(
                './pages/AddJob'
              );

              return {
                Component: AddJob,
                action: action(queryClient),
              };
            },
          },
          {
            path: 'edit-job/:jobId',
            lazy: async () => {
              const { default: EditJob, loader, action } = await import(
                './pages/EditJob'
              );

              return {
                Component: EditJob,
                loader: loader(queryClient),
                action: action(queryClient),
              };
            },
          },
          {
            path: 'stats',
            lazy: async () => {
              const [{ default: Stats, loader }, { default: ErrorElement }] =
                await Promise.all([
                  import('./pages/Stats'),
                  import('./components/ErrorElement'),
                ]);

              return {
                Component: Stats,
                loader: loader(queryClient),
                ErrorBoundary: ErrorElement,
              };
            },
          },
          {
            path: 'all-jobs',
            lazy: async () => {
              const [{ default: AllJobs, loader }, { default: ErrorElement }] =
                await Promise.all([
                  import('./pages/AllJobs'),
                  import('./components/ErrorElement'),
                ]);

              return {
                Component: () => <AllJobs queryClient={queryClient} />,
                loader: loader(queryClient),
                ErrorBoundary: ErrorElement,
              };
            },
          },
          {
            path: 'profile',
            lazy: async () => {
              const { default: Profile, action } = await import(
                './pages/Profile'
              );

              return {
                Component: Profile,
                action: action(queryClient),
              };
            },
          },
          {
            path: 'admin',
            lazy: async () => {
              const [{ default: Admin, loader }, { default: AdminError }] =
                await Promise.all([
                  import('./pages/Admin'),
                  import('./pages/AdminError'),
                ]);

              return {
                Component: Admin,
                loader: loader(queryClient),
                ErrorBoundary: AdminError,
              };
            },
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
