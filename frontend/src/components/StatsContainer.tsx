import styled from 'styled-components';
import { FaCalendarCheck, FaSuitcaseRolling, FaBug } from 'react-icons/fa';

import type { StatsData } from '../models/Job';
import StatItem from './StatItem';

const StatsContainer: React.FC<{ defaultStats: StatsData }> = ({
  defaultStats,
}) => {
  const stats = [
    {
      quantity: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      title: 'pending applications',
      color: '#f59e0b',
      bgc: '#fef3c7',
    },
    {
      quantity: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      title: 'interviews schedule',
      color: '#647acb',
      bgc: '#e0e8f9',
    },
    {
      quantity: defaultStats?.declined || 0,
      icon: <FaBug />,
      title: 'jobs declined',
      color: '#d66a6a',
      bgc: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {stats.map((stat) => (
        <StatItem key={stat.title} {...stat} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media screen and (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default StatsContainer;
