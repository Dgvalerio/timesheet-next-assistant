import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCookies } from '@/store/user/actions';
import { WrapperApi } from '@/types/api';
import api from '@/utils/api';

import { AxiosError } from 'axios';

interface ControllerReturn {
  clients: WrapperApi.Read.Clients.Client[];
  client: string;
  setClient: (client: string) => void;
  projects: WrapperApi.Read.Clients.Project[];
  project: string;
  setProject: (project: string) => void;
  categories: WrapperApi.Read.Clients.Category[];
  category: string;
  setCategory: (category: string) => void;
  date: string;
  setDate: (date: string) => void;
  initialTime: string;
  setInitialTime: (initialTime: string) => void;
  finalTime: string;
  setFinalTime: (finalTime: string) => void;
  accounted: boolean;
  setAccounted: (accounted: boolean) => void;
  totalProjectTime: number;
  totalUtilizedTime: string;
  description: string;
  setDescription: (description: string) => void;
  handleSubmit: (event: FormEvent) => Promise<void>;
  isLoading: boolean;
}

const useCreateAppointmentController = (): ControllerReturn => {
  const [clients, setClients] = useState<WrapperApi.Read.Clients.Client[]>([]);
  const [client, setClient] = useState<string>('-1');
  const [projects, setProjects] = useState<WrapperApi.Read.Clients.Project[]>(
    []
  );
  const [project, setProject] = useState<string>('-1');
  const [categories, setCategories] = useState<
    WrapperApi.Read.Clients.Category[]
  >([]);
  const [category, setCategory] = useState<string>('-1');
  const [date, setDate] = useState(
    (() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    })()
  );
  const [initialTime, setInitialTime] = useState<string>('');
  const [finalTime, setFinalTime] = useState<string>('');
  const [accounted, setAccounted] = useState<boolean>(false);
  const [totalProjectTime, setTotalProjectTime] = useState<number>(0);
  const [totalUtilizedTime, setTotalUtilizedTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { cookies } = useSelector((state) => state.user);

  const loadClients = useCallback(async () => {
    setIsLoading(true);

    try {
      const { status, data } = await api.wrapper.worksheet.read.clients({
        cookies,
      });

      if (status === 200 && data.clients) {
        setClients(data.clients);
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

  const resetForm = () => {
    setClient('-1');
    setDate(
      (() => {
        const date = new Date();
        return date.toISOString().split('T')[0];
      })()
    );
    setInitialTime('');
    setFinalTime('');
    setAccounted(false);
    setDescription('');
  };

  useEffect(() => {
    if (cookies) void loadClients();
  }, [cookies, loadClients]);

  useEffect(() => {
    if (client === '-1') {
      setProject('-1');
      setProjects([]);
      return;
    }

    if (clients.length === 0 || client === '') return;

    const selectedClient = clients.find(({ id }) => id === client);

    if (!selectedClient) return;

    setProjects(selectedClient.projects);
  }, [clients, client]);

  useEffect(() => {
    if (project === '-1') {
      setTotalProjectTime(0);
      setTotalUtilizedTime('');
      setCategories([]);
      setCategory('-1');
      return;
    }

    if (projects.length === 0 || project === '') return;

    const selectedProject = projects.find(({ Id }) => Id === +project);

    if (!selectedProject) return;

    setTotalProjectTime(selectedProject.progress.Budget);
    setTotalUtilizedTime(selectedProject.progress.ConsumedTimeInProject);
    setCategories(selectedProject.categories);
  }, [projects, project]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const [year, month, day] = date.split('-');

      const { status } = await api.wrapper.worksheet.create.appointment({
        customer: client,
        project,
        category,
        informedDate: `${day}${month}${year}`,
        startTime: initialTime,
        endTime: finalTime,
        notMonetize: accounted,
        description,
        cookies,
      });

      if (status === 200) {
        resetForm();
      }
    } catch (e) {
      console.error({ e });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    clients,
    client,
    setClient,
    projects,
    project,
    setProject,
    categories,
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
    totalUtilizedTime,
    description,
    setDescription,
    handleSubmit,
    isLoading,
  };
};

export default useCreateAppointmentController;
