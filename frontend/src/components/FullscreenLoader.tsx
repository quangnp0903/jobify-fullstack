import styled from 'styled-components';

import Loading from './Loading';

const FullscreenLoader: React.FC = () => {
  return (
    <Wrapper role="status" aria-live="polite" aria-label="Loading page">
      <Loading />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--background-color);
`;

export default FullscreenLoader;
