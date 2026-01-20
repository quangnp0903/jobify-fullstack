import type { ReactNode } from 'react';
import styled from 'styled-components';

const JobInfo: React.FC<{
  icon: ReactNode;
  text: string;
}> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  column-gap: 1rem;

  .job-icon {
    font-size: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }

  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;

export default JobInfo;
