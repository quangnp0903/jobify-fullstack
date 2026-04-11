import styled from 'styled-components';
import { useAllJobContext } from '../pages/AllJobs';
import JobItem from './JobItem';
import PagingContainer from './PagingContainer';

const JobsContainer: React.FC = () => {
  const { data } = useAllJobContext();
  const { jobs, totalJobs } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} {`job${totalJobs > 1 ? 's' : ''} found`}
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <JobItem key={job._id} {...job} />
        ))}
      </div>
      <PagingContainer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;

  h2 {
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media screen and (min-width: 1120px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default JobsContainer;
