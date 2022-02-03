import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { WrapperApi } from '@/types/api';
import api from '@/utils/api';

interface ControllerReturn {
  isLoading: boolean;
  appointments: WrapperApi.Read.Appointment[];
}

const useListAppointmentsController = (): ControllerReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<
    WrapperApi.Read.Appointment[]
  >([]);
  const { cookies } = useSelector((state) => state.user);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);

    try {
      const { status, data } = await api.wrapper.worksheet.read({ cookies });

      console.log({ status, data });

      if (status === 200 && data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (e) {
      console.error({ e });
    } finally {
      setIsLoading(false);
    }
  }, [cookies]);

  useEffect(() => {
    if (cookies) void loadAppointments();
  }, [cookies, loadAppointments]);

  return {
    isLoading,
    appointments,
  };
};

export default useListAppointmentsController;
