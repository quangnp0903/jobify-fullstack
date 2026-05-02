import { createContext, useCallback, useContext, useState } from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import {
  Query,
  useMutation,
  useQuery,
  type QueryClient,
} from '@tanstack/react-query';

import { JobsContainer, SearchContainer } from '../components';
import type { SearchJobData, JobsData } from '../models/Job';
// import { handleApiErr } from '../utils/common';
import customFetch from '../utils/customFetch';
import Modal from '../components/Modal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { toast } from 'react-toastify';

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
    const rawParams = Object.fromEntries(new URL(request.url).searchParams);
    const params = normalizeParams({
      ...rawParams,
      page: Number(rawParams.page || 1),
    });

    await queryClient.ensureQueryData(allJobsQuery(params));

    return { searchValues: { ...params } };
  };

type AllJobsCtxObj = {
  searchValues: SearchJobData;
  data: JobsData;
  onDeleteRequest: (id: string) => void;
};

const AllJobsContext = createContext<AllJobsCtxObj | null>(null);

const AllJobs: React.FC<{ queryClient: QueryClient }> = ({ queryClient }) => {
  const { searchValues } = useLoaderData<AllJobsLoaderData>();
  const { data } = useQuery<JobsData>(allJobsQuery(searchValues));
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => customFetch.delete(`/jobs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query: Query) =>
          ['jobs', 'admin'].includes(query.queryKey[0] as string),
      });
      toast.success('Job deleted successfully');
      setJobToDelete(null);
    },
  });

  const deleteRequestHandler = useCallback(
    (id: string) => setJobToDelete(id),
    []
  );

  const closeModalHandler = () => {
    deleteMutation.reset();
    setJobToDelete(null);
  };

  if (!data) return null;

  return (
    <>
      {jobToDelete && (
        <Modal
          onClose={() => {
            if (!deleteMutation.isPending) {
              closeModalHandler();
            }
          }}
        >
          <DeleteConfirmation
            onCancel={closeModalHandler}
            onConfirm={() => deleteMutation.mutate(jobToDelete)}
            isLoading={deleteMutation.isPending}
            errorMessage={
              deleteMutation.error instanceof Error
                ? deleteMutation.error.message
                : undefined
            }
          />
        </Modal>
      )}
      <AllJobsContext.Provider
        value={{ data, searchValues, onDeleteRequest: deleteRequestHandler }}
      >
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobContext = () => {
  const ctx = useContext(AllJobsContext);

  if (!ctx) {
    throw new Error('useAllJobContext must be used within AllJobs');
  }

  return ctx;
};

export default AllJobs;
