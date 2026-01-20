import styled from 'styled-components';

const Wrapper = styled.section`
  background: var(--background-secondary-color);
  padding: 3rem 2rem 2rem 2rem;

  form {
    display: block;
    max-width: unset;
    width: unset;
    padding: 0;
    background: unset;
    border-radius: unset;
    box-shadow: unset;
    margin: 2rem auto;
  }

  .btn-block {
    margin-top: 1rem;
    padding: 0.62rem 0.75rem;
  }

  @media screen and (min-width: 992px) {
    padding-bottom: 1rem;

    form {
      display: grid;
      column-gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }

    .btn-block {
      align-self: center;
    }
  }

  @media screen and (min-width: 1120px) {
    form {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
