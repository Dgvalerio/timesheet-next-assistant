import { Dispatch, SetStateAction, useState } from 'react';

interface ControllerReturn {
  onLoading: CreateAppointmentLoad[];
  setOnLoading: Dispatch<SetStateAction<CreateAppointmentLoad[]>>;
  loadAppointments: () => void;
  setLoadAppointments: Dispatch<SetStateAction<() => void>>;
}

export enum CreateAppointmentLoad {
  Submit = 'submit',
  Clients = 'clients',
  Appointments = 'appointments',
}

const useCreateAppointmentController = (): ControllerReturn => {
  const [onLoading, setOnLoading] = useState<CreateAppointmentLoad[]>([]);
  const [loadAppointments, setLoadAppointments] = useState<() => void>(() => {
    console.log('Load appointments not implemented...');
  });

  return { onLoading, setOnLoading, loadAppointments, setLoadAppointments };
};

export default useCreateAppointmentController;
