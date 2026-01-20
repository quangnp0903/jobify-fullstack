import styled from 'styled-components';
import { useAllJobContext } from '../pages/AllJobs';
import JobItem from './JobItem';

const JobsContainer: React.FC = () => {
  const { jobs } = useAllJobContext();

  console.log({ jobs });

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>99 jobs found</h5>
      <div className="jobs">
        {jobs.map((job) => (
          <JobItem key={job._id} {...job} />
        ))}
      </div>
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
