import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { WrapperApi } from '@/types/api';
import api from '@/utils/api';
import { routes } from '@/utils/routes';

interface ControllerReturn {
  client: string;
  setClient: (client: string) => void;
  project: string;
  setProject: (project: string) => void;
  category: string;
  setCategory: (category: string) => void;
  date: string;
  setDate: (date: string) => void;
  initialTime: string;
  setInitialTime: (initialTime: string) => void;
  finalTime: string;
  setFinalTime: (finalTime: string) => void;
  accounted: string;
  setAccounted: (accounted: string) => void;
  totalProjectTime: string;
  setTotalProjectTime: (totalProjectTime: string) => void;
  totalUtilizedTime: string;
  setTotalUtilizedTime: (totalUtilizedTime: string) => void;
  description: string;
  setDescription: (description: string) => void;
  handleSubmit: () => void;
  logout: () => void;
  isLoading: boolean;
  appointments: WrapperApi.Read.Appointment[];
}

const useWorksheetReadController = (): ControllerReturn => {
  const router = useRouter();
  const [client, setClient] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState(
    (() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    })()
  );
  const [initialTime, setInitialTime] = useState<string>('');
  const [finalTime, setFinalTime] = useState<string>('');
  const [accounted, setAccounted] = useState<string>('');
  const [totalProjectTime, setTotalProjectTime] = useState<string>('');
  const [totalUtilizedTime, setTotalUtilizedTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<
    WrapperApi.Read.Appointment[]
  >([]);
  const { cookies } = useSelector((state) => state.user);

  const handleSubmit = () => {
    alert(
      JSON.stringify({
        client,
        project,
        category,
        date,
        initialTime,
        finalTime,
        accounted,
        totalProjectTime,
        totalUtilizedTime,
        description,
      })
    );
  };

  const logout = () => {
    void router.push(routes.wrapper.account.login());
  };

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
    client,
    setClient,
    project,
    setProject,
    category,
    setCategory,
    date,
    setDate,
    initialTime,
    setInitialTime,
    finalTime,
    setFinalTime,
    accounted,
    setAccounted,
    totalProjectTime,
    setTotalProjectTime,
    totalUtilizedTime,
    setTotalUtilizedTime,
    description,
    setDescription,
    handleSubmit,
    logout,
    isLoading,
    appointments,
  };
};

export default useWorksheetReadController;
