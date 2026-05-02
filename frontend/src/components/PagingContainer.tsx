import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useAllJobContext } from '../pages/AllJobs';

const PagingContainer: React.FC = () => {
  const { data } = useAllJobContext();
  const { currentPage, numOfPages } = data;
  const [searchParams, setSearchParams] = useSearchParams();

  if (numOfPages === 1) {
    return null;
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    setSearchParams(params);
  };

  const navPage = (page: number) => {
    let targetPage = page;

    if (targetPage > numOfPages) targetPage = 1;
    if (targetPage < 1) targetPage = numOfPages;

    goToPage(targetPage);
  };

  const btnContent: React.ReactNode[] = [];
  const firstPageBtn = (
    <button key={`page-1`} className="btn btn-num" onClick={() => goToPage(1)}>
      1
    </button>
  );
  const lastPageBtn = (
    <button
      key={`page-${numOfPages}`}
      className="btn btn-num"
      onClick={() => goToPage(numOfPages)}
    >
      {numOfPages}
    </button>
  );
  const dotBtn = (key: string) => (
    <span key={key} className="btn-num">
      ...
    </span>
  );

  // Build up current page button and its siblings
  const currentPageBtn = (
    <button
      key={`page-${currentPage}`}
      className="btn btn-num active"
      onClick={() => goToPage(currentPage)}
    >
      {currentPage}
    </button>
  );
  let prevPageBtn = null;
  let nextPageBtn = null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (prevPage > 0) {
    prevPageBtn = (
      <button
        key={`page-${prevPage}`}
        className="btn btn-num"
        onClick={() => goToPage(prevPage)}
      >
        {prevPage}
      </button>
    );
  }

  if (nextPage <= numOfPages) {
    nextPageBtn = (
      <button
        key={`page-${nextPage}`}
        className="btn btn-num"
        onClick={() => goToPage(nextPage)}
      >
        {nextPage}
      </button>
    );
  }

  if (prevPageBtn) btnContent.push(prevPageBtn);
  btnContent.push(currentPageBtn);
  if (nextPageBtn) btnContent.push(nextPageBtn);

  if (prevPage === 2) {
    btnContent.unshift(firstPageBtn);
  }

  if (prevPage - 1 > 1) {
    btnContent.unshift(firstPageBtn, dotBtn('dots-start'));
  }

  if (nextPage + 1 < numOfPages) {
    btnContent.push(dotBtn('dots-end'), lastPageBtn);
  }

  if (nextPage === numOfPages - 1) {
    btnContent.push(lastPageBtn);
  }

  return (
    <Wrapper>
      <button className="btn btn-nav" onClick={() => navPage(currentPage - 1)}>
        &laquo; Prev
      </button>
      <div className="btn-container">{btnContent}</div>
      <button className="btn btn-nav" onClick={() => navPage(currentPage + 1)}>
        Next &raquo;
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
  justify-content: flex-end;
  gap: 1rem;

  .btn-num {
    padding: 0.5rem 1.2rem;
    font-size: 1.25rem;
    background: var(--background-secondary-color);
    color: var(--primary-500);
    font-weight: 700;

    &.active {
      color: var(--background-secondary-color);
      background: var(--primary-500);
    }
  }

  .btn-nav {
    text-transform: capitalize;
    padding: 0.6rem 1.5rem;
    background: var(--background-secondary-color);
    color: var(--primary-500);
    font-size: 0.8rem;
    &:hover {
      color: var(--background-secondary-color);
      background: var(--primary-500);
    }
  }
`;

export default PagingContainer;
