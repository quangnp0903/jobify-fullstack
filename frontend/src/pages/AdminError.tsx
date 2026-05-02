import { useEffect, useRef } from 'react';
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminError: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const hasHandled = useRef(false);

  useEffect(() => {
    if (hasHandled.current) return;

    if (isRouteErrorResponse(error)) {
      hasHandled.current = true;

      if (error.status === 403) {
        toast.error('You are not authorized to view this page.');
      } else {
        toast.error(error.data);
      }

      navigate('/dashboard');
    }
  }, [error, navigate]);

  return null;
};

export default AdminError;
