import styled from 'styled-components';
import { FaCalendarAlt, FaLocationArrow, FaBriefcase } from 'react-icons/fa';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import type { Job } from '../models/Job';
import JobInfo from './JobInfo';
import { Form, Link } from 'react-router-dom';

day.extend(advancedFormat);

const JobItem: React.FC<Job> = ({
  _id,
  company,
  position,
  jobStatus,
  jobType,
  jobLocation,
  createdAt,
}) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={day(createdAt).format('MMM Do, YYYY')}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link className="btn" to={`../edit-job/${_id}`}>
            Edit
          </Link>
          <Form method="DELETE" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: 1px;
  box-shadow: var(--shadow-2);
  border-radius: var(--border-radius);
  background: var(--background-secondary-color);
  display: grid;

  header {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    column-gap: 2rem;
    border-bottom: 1px solid var(--grey-100);
  }

  .main-icon {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    background: var(--primary-500);
    border-radius: var(--border-radius);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }

  .info {
    p {
      margin-top: 0.5rem;
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
    }
  }

  .content {
    padding: 2rem 1.5rem 1rem 1.5rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1.5rem;
    align-items: center;
    justify-content: center;

    .status {
      text-transform: capitalize;
      padding: 0.5rem;
      background: #e0e8f9;
      color: #647acb;
      display: flex;
      height: 30px;
      width: 100px;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius);
      letter-spacing: var(--letter-spacing);
    }
  }

  footer {
    margin-top: 1.5rem;
    display: flex;
    column-gap: 0.5rem;
    align-items: center;

    .btn {
      font-size: 0.85rem;
      height: 30px;
      display: flex;
      align-items: center;
    }
  }

  @media screen and (min-width: 576px) {
    .content-center {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default JobItem;
