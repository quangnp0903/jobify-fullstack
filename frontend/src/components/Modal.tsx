import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  return ReactDOM.createPortal(
    <>
      <Content>{children}</Content>
      <Backdrop onClick={onClose} />
    </>,
    document.getElementById('modal')!
  );
};

const Content = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);

  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 2rem;

  width: 90%;
  max-width: 420px;

  box-shadow: var(--shadow-3);
  z-index: 1001;

  opacity: 0;
  animation: modalFadeIn 0.2s ease-out forwards;

  @keyframes modalFadeIn {
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);

  z-index: 1000;
`;

export default Modal;
