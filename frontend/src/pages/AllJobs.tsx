import { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { JobsContainer, SearchContainer } from '../components';
import type { Job } from '../models/Job';
import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';

type AllJobsLoaderData = {
  jobs: Job[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const { data } = await customFetch.get<AllJobsLoaderData>('/jobs');

    return data;
  } catch (error) {
    return handleApiErr(error);
  }
};

type AllJobsCtxObj = {
  jobs: Job[];
};

const AllJobsContext = createContext<AllJobsCtxObj>({
  jobs: [],
});

const AllJobs = () => {
  const { jobs } = useLoaderData<AllJobsLoaderData>();

  return (
    <AllJobsContext.Provider value={{ jobs }}>
      {/* <SearchContainer /> */}
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobsContext);

export default AllJobs;
