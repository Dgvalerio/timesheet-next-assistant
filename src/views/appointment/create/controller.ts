import { Dispatch, SetStateAction, useState } from 'react';

interface ControllerReturn {
  onLoading: CreateAppointmentLoad[];
  setOnLoading: Dispatch<SetStateAction<CreateAppointmentLoad[]>>;
  loadAppointments: () => void;
  appointmentsLoaded: () => void;
  loadingAppointments: number;
}

export enum CreateAppointmentLoad {
  Submit = 'submit',
  Clients = 'clients',
  Appointments = 'appointments',
}

const useCreateAppointmentController = (): ControllerReturn => {
  const [onLoading, setOnLoading] = useState<CreateAppointmentLoad[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState<number>(0);

  const loadAppointments = () =>
    setLoadingAppointments((prevState) => prevState + 1);

  const appointmentsLoaded = () =>
    setLoadingAppointments((prevState) => prevState - 1);

  return {
    onLoading,
    setOnLoading,
    loadingAppointments,
    loadAppointments,
    appointmentsLoaded,
  };
};

export default useCreateAppointmentController;
