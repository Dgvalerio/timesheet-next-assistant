import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCookies } from '@/store/user/actions';
import { WrapperApi } from '@/types/api';
import api from '@/utils/api';

import { AxiosError } from 'axios';

interface ControllerReturn {
  isLoading: boolean;
  appointments: WrapperApi.Read.Appointments.Appointment[];
}

const useListAppointmentsController = (): ControllerReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<
    WrapperApi.Read.Appointments.Appointment[]
  >([]);

  const dispatch = useDispatch();
  const { cookies } = useSelector((state) => state.user);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);

    try {
      const { status, data } = await api.wrapper.worksheet.read.appointments({
        cookies,
      });

      if (status === 200 && data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (e) {
      if ((<AxiosError>e).response?.status === 401) {
        dispatch(setCookies({ cookies: [] }));
      }
      console.error({ e });
    } finally {
      setIsLoading(false);
    }
  }, [cookies, dispatch]);

  useEffect(() => {
    if (cookies) void loadAppointments();
  }, [cookies, loadAppointments]);

  return {
    isLoading,
    appointments,
  };
};

export default useListAppointmentsController;
