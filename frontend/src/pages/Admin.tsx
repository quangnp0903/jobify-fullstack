import { useLoaderData } from 'react-router-dom';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import customFetch from '../utils/customFetch';
import type { ApiError } from '../models/Error';
import styled from 'styled-components';
import { StatItem } from '../components';

type AdminLoaderData = {
  users: number;
  jobs: number;
};

const Admin: React.FC = () => {
  const { users, jobs } = useLoaderData<AdminLoaderData>();

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
export const loader = async () => {
  try {
    const { data } = await customFetch.get<AdminLoaderData>(
      '/users/admin/app-stats'
    );
    // toast.success('Login successfully');
    return data;
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
