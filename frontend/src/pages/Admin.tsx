import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { useQuery, type QueryClient } from '@tanstack/react-query';

import customFetch from '../utils/customFetch';
import type { ApiError } from '../models/Error';
import { StatItem } from '../components';

type AdminLoaderData = {
  users: number;
  jobs: number;
};

const adminQuery = {
  queryKey: ['admin'],
  queryFn: async () => {
    const { data } = await customFetch.get<AdminLoaderData>(
      '/users/admin/app-stats'
    );
    return data;
  },
};

const Admin: React.FC = () => {
  const { data } = useQuery<AdminLoaderData>(adminQuery);
  const { users, jobs } = data!;

  // console.log({ users, jobs });

  return (
    <Wrapper>
      <StatItem
        quantity={users}
        icon={<FaSuitcaseRolling />}
        title="current users"
        color="#e9b949"
        bgc="#fcefc7"
      />
      <StatItem
        quantity={jobs}
        icon={<FaCalendarCheck />}
        title="total jobs"
        color="#647acb"
        bgc="#e0e8f9"
      />
    </Wrapper>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData<AdminLoaderData>(adminQuery);
  } catch (error) {
    const err = error as ApiError;
    throw new Response(err.response?.data?.msg, { status: err.status });
  }
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media screen and (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Admin;
