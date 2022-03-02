import { Dispatch, SetStateAction, useState } from 'react';

interface ControllerReturn {
  onLoading: CreateAppointmentLoad[];
  setOnLoading: Dispatch<SetStateAction<CreateAppointmentLoad[]>>;
}

export enum CreateAppointmentLoad {
  Submit = 'submit',
  Clients = 'clients',
}

const useCreateAppointmentController = (): ControllerReturn => {
  const [onLoading, setOnLoading] = useState<CreateAppointmentLoad[]>([]);

  return { onLoading, setOnLoading };
};

export default useCreateAppointmentController;
