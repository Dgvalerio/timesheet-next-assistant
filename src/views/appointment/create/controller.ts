import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { UserClient } from '@/services/firestore/UserClient/Controller';
import { Client, Project, Category } from '@/types/entities';

interface ControllerReturn {
  clients: Client[];
  client: string;
  setClient: (client: string) => void;
  projects: Project[];
  project: string;
  setProject: (project: string) => void;
  categories: Category[];
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
  description: string;
  setDescription: (description: string) => void;
  commit: string;
  setCommit: (commit: string) => void;
  commitVisible: boolean;
  handleSubmit: (event: FormEvent) => Promise<void>;
  isLoading: boolean;
}

const useCreateAppointmentController = (): ControllerReturn => {
  const { uid } = useSelector((state) => state.user);

  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState(
    (() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    })()
  );
  const [initialTime, setInitialTime] = useState<string>('');
  const [finalTime, setFinalTime] = useState<string>('');
  const [accounted, setAccounted] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [commitVisible, setCommitVisible] = useState<boolean>(false);
  const [commit, setCommit] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log({ event });
      toast.success('Sucesso!');
    } catch (e) {
      console.error({ e });
      toast.error('Falha!');
    } finally {
      setIsLoading(false);
    }
  };

  const loadClients = useCallback(async () => {
    if (!uid) return;
    setIsLoading(true);

    try {
      const response = await UserClient.loadUserClients(uid);

      setClients(response);
      setClient(response[0].id);
    } catch (e) {
      console.error({ e });
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

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
    if (uid) void loadClients();
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
    description,
    setDescription,
    commit,
    setCommit,
    commitVisible,
    handleSubmit,
    isLoading,
  };
};

export default useCreateAppointmentController;
