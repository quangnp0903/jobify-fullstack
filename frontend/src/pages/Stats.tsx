import { useLoaderData } from 'react-router-dom';

import customFetch from '../utils/customFetch';
import type { ApiError } from '../models/Error';
import type { MonthlyApp, StatsData } from '../models/Job';
import StatsContainer from '../components/StatsContainer';
import ChartsContainer from '../components/ChartsContainer';

type StatsLoaderData = {
  defaultStats: StatsData;
  monthlyApplications: MonthlyApp[];
};

const Stats: React.FC = () => {
  const { defaultStats, monthlyApplications } =
    useLoaderData<StatsLoaderData>();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      <ChartsContainer data={monthlyApplications} />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const { data } = await customFetch.get<StatsLoaderData>('/jobs/stats');
    // toast.success('Login successfully');
    return data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(err.response?.data?.msg, { status: err.status });
  }
};

export default Stats;
