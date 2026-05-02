import { useEffect } from 'react';
import styled from 'styled-components';

const DeleteConfirmation: React.FC<{
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  errorMessage?: string;
  isError?: boolean;
}> = ({ onCancel, onConfirm, errorMessage, isLoading = false }) => {
  // console.log({ isError, errorMessage });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel, isLoading]);

  return (
    <Wrapper>
      <h2 id="delete-confirmation-title">Are you sure?</h2>
      <p>Do you really want to remove this job?</p>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="confirmation-actions">
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          No
        </button>
        <button
          className="btn btn-danger"
          disabled={isLoading}
          onClick={onConfirm}
        >
          {isLoading ? 'Deleting...' : 'Yes'}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;

  h2 {
    font-family: 'Raleway', sans-serif;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary-color);
  }

  p {
    font-size: 1rem;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
  }

  .error {
    color: var(--red-dark);
    background: var(--red-light);
    padding: 0.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .confirmation-actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
  }

  button {
    min-width: 80px;
  }

  .btn-danger {
    background: var(--red-dark);
    color: white;

    &:hover {
      background: var(--red-dark-hover);
      color: var(--red-dark);
    }
  }

  .btn-secondary {
    background: var(--grey-200);
    color: var(--text-primary-color);

    &:hover {
      background: var(--grey-300);
    }
  }
`;

export default DeleteConfirmation;
