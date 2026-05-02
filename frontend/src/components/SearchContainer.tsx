import { useEffect, useRef } from 'react';
import { Form, Link, useSubmit } from 'react-router-dom';

import Wrapper from '../assets/wrappers/DashboardForm';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from '../utils/constants';
import { useAllJobContext } from '../pages/AllJobs';

const SearchContainer: React.FC = () => {
  const { searchValues } = useAllJobContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  // console.log({ search, jobStatus, jobType, sort });

  const submit = useSubmit();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    const form = e.currentTarget.form;

    if (!form) return;

    searchTimer.current = setTimeout(() => {
      submit(form);
    }, 2000);
  };

  return (
    <Wrapper>
      <h5>Search Form</h5>
      <Form className="form" key={JSON.stringify(searchValues)}>
        <FormRow
          name="search"
          type="text"
          defaultValue={search}
          onChange={handleSearchChange}
        />
        <FormRowSelect
          name="jobStatus"
          labelText="job status"
          defaultValue={jobStatus}
          // defaultValue="all"
          list={['all', ...Object.values(JOB_STATUS)]}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        <FormRowSelect
          name="jobType"
          labelText="job type"
          defaultValue={jobType}
          // defaultValue="all"
          list={['all', ...Object.values(JOB_TYPE)]}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        <FormRowSelect
          name="sort"
          defaultValue={sort}
          // defaultValue={JOB_SORT_BY.NEWEST_FIRST}
          list={[...Object.values(JOB_SORT_BY)]}
          onChange={(e) => submit(e.currentTarget.form)}
        />

        <Link to="../all-jobs" className="btn form-btn" replace>
          reset search values
        </Link>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
