import { useEffect, useState } from 'react';

interface ControllerReturn {
  isLoading: boolean;
}

const useReadAppointmentsController = (): ControllerReturn => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return { isLoading };
};

export default useReadAppointmentsController;
