import type { ReactNode } from 'react';
import styled from 'styled-components';

type WrapperProps = {
  color: string;
  bgc: string;
};

const StatItem: React.FC<{
  quantity: number;
  icon: ReactNode;
  color: string;
  title: string;
  bgc: string;
}> = ({ quantity, icon, color, title, bgc }) => {
  return (
    <Wrapper color={color} bgc={bgc}>
      <header className="top-content">
        <span className="quantity">{quantity}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article<WrapperProps>`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  border-bottom: 5px solid ${(props) => props.color};
  padding: 2rem;

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.color};

    .quantity {
      font-size: 50px;
      font-weight: 700;
      line-height: 2;
    }

    .icon {
      width: 70px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: ${(props) => props.bgc};
      border-radius: var(--border-radius);
    }
  }

  .title {
    text-transform: capitalize;
    margin-top: 0.5rem;
    text-align: left;
    font-size: 1.25rem;
  }
`;

export default StatItem;
