import { useEffect, useRef } from 'react';
import { useRouteError } from 'react-router-dom';
import { toast } from 'react-toastify';

const ErrorElement: React.FC = () => {
  const error = useRouteError();
  const hasHandled = useRef(false);
  console.log('err', error);

  useEffect(() => {
    if (hasHandled.current) return;
    hasHandled.current = true;

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Something went wrong');
    }
  }, [error]);

  return <h4>There was an error...</h4>;
};

export default ErrorElement;
