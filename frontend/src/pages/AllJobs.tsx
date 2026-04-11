import { createContext, useContext } from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { useQuery, type QueryClient } from '@tanstack/react-query';

import { JobsContainer, SearchContainer } from '../components';
import type { SearchJobData, JobsData } from '../models/Job';
// import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';

type AllJobsLoaderData = {
  searchValues: SearchJobData;
};

type SearchParams = {
  search: string;
  jobStatus: string;
  jobType: string;
  sort: string;
  page: number;
};

const normalizeParams = (params: Partial<SearchParams>): SearchParams => ({
  search: params.search ?? '',
  jobStatus: params.jobStatus ?? 'all',
  jobType: params.jobType ?? 'all',
  sort: params.sort ?? 'newest',
  page: params.page ?? 1,
});

const allJobsQuery = (params: Partial<SearchParams>) => ({
  queryKey: ['jobs', params] as const,
  queryFn: async () => {
    const { data } = await customFetch.get<JobsData>('/jobs', {
      params,
    });
    return data;
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    // const params = getSearchParams(request.url);
    const rawParams = Object.fromEntries(new URL(request.url).searchParams);
    const params = normalizeParams({
      ...rawParams,
      page: Number(rawParams.page || 1),
    });

    await queryClient.ensureQueryData(allJobsQuery(params));

    return { searchValues: { ...params } };
    /* try {
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
    } */
  };

type AllJobsCtxObj = {
  searchValues: SearchJobData;
  data: JobsData;
};

const AllJobsContext = createContext<AllJobsCtxObj>({
  searchValues: {
    search: '',
    jobStatus: 'all',
    jobType: 'all',
    sort: 'newest',
    page: 1,
  },
  data: {
    jobs: [],
    currentPage: 1,
    numOfPages: 1,
    totalJobs: 0,
  },
});

const AllJobs = () => {
  const { searchValues } = useLoaderData<AllJobsLoaderData>();
  const { data } = useQuery<JobsData>(allJobsQuery(searchValues));

  if (!data) return null;

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => useContext(AllJobsContext);

export default AllJobs;
