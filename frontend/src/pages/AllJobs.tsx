import { createContext, useContext } from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';

import { JobsContainer, SearchContainer } from '../components';
import type { Job, SearchJobData } from '../models/Job';
import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';

type AllJobsLoaderData = {
  jobs: Job[];
  searchValues: SearchJobData;
  totalJobs: number;
  currentPage: number;
  numOfPages: number;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const { data } = await customFetch.get<AllJobsLoaderData>('/jobs', {
      params,
    });

    const defaultParams = {
      search: '',
      jobStatus: 'all',
      jobType: 'all',
      sort: 'newest',
    };

    // console.log({ ...data, searchValues: { ...params } });
    return { ...data, searchValues: { ...defaultParams, ...params } };
  } catch (error) {
    return handleApiErr(error);
  }
};

type AllJobsCtxObj = {
  jobs: Job[];
  searchValues: SearchJobData;
  currentPage: number;
  numOfPages: number;
  totalJobs: number;
};

const AllJobsContext = createContext<AllJobsCtxObj>({
  jobs: [],
  searchValues: {
    search: '',
    jobStatus: 'all',
    jobType: 'all',
    sort: 'newest',
  },
  currentPage: 1,
  numOfPages: 1,
  totalJobs: 0,
});

const AllJobs = () => {
  const { jobs, searchValues, currentPage, numOfPages, totalJobs } =
    useLoaderData<AllJobsLoaderData>();

  // console.log({ search: searchValues, jobs });

  return (
    <AllJobsContext.Provider
      value={{ jobs, searchValues, currentPage, numOfPages, totalJobs }}
    >
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobsContext);

export default AllJobs;
