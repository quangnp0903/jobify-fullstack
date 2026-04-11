import { QueryClient, useQuery } from '@tanstack/react-query';

import customFetch from '../utils/customFetch';
import type { MonthlyApp, StatsData } from '../models/Job';
import StatsContainer from '../components/StatsContainer';
import ChartsContainer from '../components/ChartsContainer';

type StatsLoaderData = {
  defaultStats: StatsData;
  monthlyApplications: MonthlyApp[];
};

const Stats: React.FC = () => {
  // const { defaultStats, monthlyApplications } =
  //   useLoaderData<StatsLoaderData>();
  const { data } = useQuery<StatsLoaderData>(statsQuery);
  const { defaultStats, monthlyApplications } = data!;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get<StatsLoaderData>('/jobs/stats');
    return response.data;
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = (queryClient: QueryClient) => async () => {
  const data = await queryClient.ensureQueryData<StatsLoaderData>(statsQuery);
  return data;
  /* try {
    const { data } = await customFetch.get<StatsLoaderData>('/jobs/stats');
    // toast.success('Login successfully');
    return data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(err.response?.data?.msg, { status: err.status });
  } */
};

export default Stats;
