import { JOB_STATUS, JOB_TYPE } from '../utils/constants';

type ValueOf<T> = T[keyof T];

export type Job = {
  _id: string;
  company: string;
  position: string;
  jobStatus: ValueOf<typeof JOB_STATUS>; // (typeof JOB_STATUS)[keyof typeof JOB_STATUS]
  jobType: ValueOf<typeof JOB_TYPE>;
  jobLocation: string;
  createdAt: string;
  updatedAt: string;
};

export type JobSubmitData = {
  company: string;
  position: string;
  jobType: string;
  jobLocation: string;
  jobStatus: string;
};
