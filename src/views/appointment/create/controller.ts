import { FormEvent, useState } from 'react';

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
  handleSubmit: (event: FormEvent) => Promise<void>;
  isLoading: boolean;
}

const useCreateAppointmentController = (): ControllerReturn => {
  const [clients] = useState<Client[]>([]);
  const [client, setClient] = useState<string>('');
  const [projects] = useState<Project[]>([]);
  const [project, setProject] = useState<string>('');
  const [categories] = useState<Category[]>([]);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log({ event });
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
    description,
    setDescription,
    handleSubmit,
    isLoading,
  };
};

export default useCreateAppointmentController;
