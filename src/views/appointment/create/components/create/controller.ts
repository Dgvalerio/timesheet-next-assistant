import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { UserClient } from '@/services/firestore/UserClient/Controller';
import { ScrapperApi } from '@/services/scrapperApi';
import { setCookies } from '@/store/user/actions';
import { Client, Project, Category } from '@/types/entities';
import { CreateAppointmentLoad } from '@/views/appointment/create/controller';

import { AxiosError } from 'axios';
import { compareAsc } from 'date-fns';

interface ControllerParams {
  onLoading: CreateAppointmentLoad[];
  setOnLoading: Dispatch<SetStateAction<CreateAppointmentLoad[]>>;
}

interface ControllerReturn {
  clients: Client[];
  client: string;
  clientError: string | null;
  projects: Project[];
  project: string;
  projectError: string | null;
  categories: Category[];
  category: string;
  categoryError: string | null;
  date: string;
  dateError: string | null;
  initialTime: string;
  initialTimeError: string | null;
  finalTime: string;
  finalTimeError: string | null;
  accounted: boolean;
  description: string;
  descriptionError: string | null;
  commit: string;
  commitError: string | null;
  commitVisible: boolean;
  handleSubmit: (event: FormEvent) => Promise<void>;
  updateField: (event: ChangeEvent<HTMLInputElement>) => void;
}

export enum InputName {
  Client = 'client',
  Project = 'project',
  Category = 'category',
  Date = 'date',
  InitialTime = 'initialTime',
  FinalTime = 'finalTime',
  Accounted = 'accounted',
  Description = 'description',
  Commit = 'commit',
}

export type Controller = (params: ControllerParams) => ControllerReturn;

const useCreateFormController: Controller = ({ onLoading, setOnLoading }) => {
  const dispatch = useDispatch();
  const { uid, cookies } = useSelector((state) => state.user);

  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<string>('');
  const [clientError, setClientError] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<string>('');
  const [projectError, setProjectError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [date, setDate] = useState(
    (() => {
      const date = new Date();

      return date.toISOString().split('T')[0];
    })()
  );
  const [dateError, setDateError] = useState<string | null>(null);

  const [initialTime, setInitialTime] = useState<string>('00:00');
  const [initialTimeError, setInitialTimeError] = useState<string | null>(null);

  const [finalTime, setFinalTime] = useState<string>('00:01');
  const [finalTimeError, setFinalTimeError] = useState<string | null>(null);

  const [accounted, setAccounted] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [commitVisible, setCommitVisible] = useState<boolean>(false);

  const [commit, setCommit] = useState<string>('');
  const [commitError, setCommitError] = useState<string | null>(null);

  const validateField: {
    [key in InputName]: (value: string) => boolean;
  } = {
    [InputName.Client]: (value: string) => {
      if (!value || value === '' || value === '-1') {
        setClientError('Um cliente deve ser selecionado!');

        return false;
      }

      setClientError(null);

      return true;
    },
    [InputName.Project]: (value: string) => {
      if (!value || value === '' || value === '-1') {
        setProjectError('Um projeto deve ser selecionado!');

        return false;
      }

      setProjectError(null);

      return true;
    },
    [InputName.Category]: (value: string) => {
      if (!value || value === '' || value === '-1') {
        setCategoryError('Uma categoria deve ser selecionada!');

        return false;
      }

      setCategoryError(null);

      return true;
    },
    [InputName.Date]: (value: string) => {
      const todayDate = (() => {
        const date = new Date();
        const stringDate = date.toISOString().split('T')[0];
        const [year, month, day] = stringDate.split('-');

        return new Date(+year, +month - 1, +day, 0, 0, 0);
      })();
      const appointmentDate = (() => {
        const [year, month, day] = value.split('-');

        return new Date(+year, +month - 1, +day, 0, 0, 0);
      })();

      const isFuture = compareAsc(appointmentDate, todayDate);

      if (isFuture > 0) {
        setDateError('O dia escolhido não pode ser maior que o atual!');

        return false;
      }

      setDateError(null);

      return true;
    },
    [InputName.InitialTime]: (value: string) => {
      const todayDate = new Date();
      const appointmentDate = (() => {
        const [year, month, day] = date.split('-');
        const [hour, minute] = value.split(':');

        return new Date(+year, +month - 1, +day, +hour, +minute, 0);
      })();

      const isFuture = compareAsc(appointmentDate, todayDate);

      if (isFuture > 0) {
        setInitialTimeError(
          'O horário inicial não pode ser maior que o atual!'
        );

        return false;
      }

      const start = Number(value.replace(':', ''));
      const end = Number(finalTime.replace(':', ''));

      if (start >= end) {
        const msg = 'O horário final deve ser maior que o inicial!';

        setInitialTimeError(msg);
        setFinalTimeError(msg);

        return false;
      }

      setInitialTimeError(null);
      setFinalTimeError(null);

      return true;
    },
    [InputName.FinalTime]: (value: string) => {
      const todayDate = new Date();
      const appointmentDate = (() => {
        const [year, month, day] = date.split('-');
        const [hour, minute] = value.split(':');

        return new Date(+year, +month - 1, +day, +hour, +minute, 0);
      })();

      const isFuture = compareAsc(appointmentDate, todayDate);

      if (isFuture > 0) {
        setFinalTimeError('O horário final não pode ser maior que o atual!');

        return false;
      }

      const start = Number(initialTime.replace(':', ''));
      const end = Number(value.replace(':', ''));

      if (start >= end) {
        const msg = 'O horário final deve ser maior que o inicial!';

        setInitialTimeError(msg);
        setFinalTimeError(msg);

        return false;
      }

      setInitialTimeError(null);
      setFinalTimeError(null);

      return true;
    },
    [InputName.Accounted]: () => true,
    [InputName.Description]: (value: string) => {
      if (!value || value === '') {
        setDescriptionError('Uma descrição deve ser informada!');

        return false;
      }
      setDescriptionError(null);

      return true;
    },
    [InputName.Commit]: (value: string) => {
      if (commitVisible && (!value || value === '')) {
        setCommitError('Um link de commit deve ser informado!');

        return false;
      }
      setCommitError(null);

      return true;
    },
  };

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    switch (name) {
      case InputName.Client:
        setClient(value);
        validateField[name](value);
        break;
      case InputName.Project:
        setProject(value);
        validateField[name](value);
        break;
      case InputName.Category:
        setCategory(value);
        validateField[name](value);
        break;
      case InputName.Date:
        setDate(value);
        validateField[name](value);
        break;
      case InputName.InitialTime:
        setInitialTime(value);
        validateField[name](value);
        break;
      case InputName.FinalTime:
        setFinalTime(value);
        validateField[name](value);
        break;
      case InputName.Accounted:
        setAccounted(checked);
        break;
      case InputName.Description:
        setDescription(value);
        validateField[name](value);
        break;
      case InputName.Commit:
        setCommit(value);
        validateField[name](value);
        break;
      default:
        console.log({ name, value, checked });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setOnLoading((prev) =>
      prev.includes(CreateAppointmentLoad.Submit)
        ? prev
        : prev.concat(CreateAppointmentLoad.Submit)
    );

    if (
      !validateField[InputName.Client](client) ||
      !validateField[InputName.Project](project) ||
      !validateField[InputName.Category](category) ||
      !validateField[InputName.Date](date) ||
      !validateField[InputName.InitialTime](initialTime) ||
      !validateField[InputName.FinalTime](finalTime) ||
      !validateField[InputName.Description](description) ||
      !validateField[InputName.Commit](commit)
    ) {
      toast.warn('Verifique os campos do formulário!');
      setOnLoading((prev) =>
        prev.filter((item) => item !== CreateAppointmentLoad.Submit)
      );

      return;
    }

    const [year, month, day] = date.split('-');

    try {
      await ScrapperApi.createAppointment({
        cookies,
        customer: client,
        project,
        category,
        startTime: initialTime.replace(':', ''),
        endTime: finalTime.replace(':', ''),
        informedDate: `${day}${month}${year}`,
        commit: commitVisible ? commit : undefined,
        description,
        notMonetize: accounted,
      });

      toast.success('Sucesso!');
    } catch (e) {
      toast.error((<AxiosError>e).response?.data.error || 'Falha!');

      if ((<AxiosError>e).response?.status === 401) {
        dispatch(setCookies({ cookies: [] }));
      }
    }

    setOnLoading((prev) =>
      prev.filter((item) => item !== CreateAppointmentLoad.Submit)
    );
  };

  const loadClients = useCallback(async () => {
    if (!uid) return;
    setOnLoading((prev) =>
      prev.includes(CreateAppointmentLoad.Clients)
        ? prev
        : prev.concat(CreateAppointmentLoad.Clients)
    );

    try {
      const response = await UserClient.loadUserClients(uid);

      setClients(response);
      setClient(response[0].id);
    } catch (e) {
      console.error({ e });
    } finally {
      setOnLoading((prev) =>
        prev.filter((item) => item !== CreateAppointmentLoad.Clients)
      );
    }
  }, [setOnLoading, uid]);

  const resetProject = () => {
    setProjects([]);
    setProject('');
  };

  const resetCategory = () => {
    setCategories([]);
    setCategory('');
  };

  // Load Clients
  useEffect(() => {
    if (!uid) return;

    void loadClients();
  }, [uid, loadClients]);

  // Load projects of selected client
  useEffect(() => {
    if (!client || client === '') {
      resetProject();

      return;
    }

    const selectedClient = clients.find(({ id }) => id === client);

    if (!selectedClient) {
      resetProject();

      return;
    }

    const projectsOfSelectedClient = selectedClient.projects;

    setProjects(projectsOfSelectedClient);
    setProject(
      projectsOfSelectedClient.length > 0 ? projectsOfSelectedClient[0].id : ''
    );
  }, [client, clients]);

  // Load categories of selected project
  useEffect(() => {
    if (!project || project === '') {
      resetCategory();

      return;
    }

    const selectedProject = projects.find(({ id }) => id === project);

    if (!selectedProject) {
      resetCategory();

      return;
    }

    const categoriesOfSelectedProject = selectedProject.categories;

    setCategories(categoriesOfSelectedProject);
    setCategory(
      categoriesOfSelectedProject.length > 0
        ? categoriesOfSelectedProject[0].id
        : ''
    );
  }, [project, projects]);

  // Set visibly of commit input
  useEffect(() => {
    if (!category || !categories || categories.length === 0) {
      setCommitVisible(false);
    } else {
      const actualCategory = categories.find(({ id }) => id === category);

      if (actualCategory && actualCategory.name === 'Desenvolvimento') {
        setCommitVisible(true);
      } else {
        setCommitVisible(false);
      }
    }
  }, [categories, category]);

  return {
    clients,
    client,
    clientError,
    projects,
    project,
    projectError,
    categories,
    category,
    categoryError,
    date,
    dateError,
    initialTime,
    initialTimeError,
    finalTime,
    finalTimeError,
    accounted,
    description,
    descriptionError,
    commit,
    commitError,
    commitVisible,
    handleSubmit,
    onLoading,
    updateField,
  };
};

export default useCreateFormController;
