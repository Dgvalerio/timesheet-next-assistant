import { useState } from 'react';

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
  totalUtilizedTime: string;
  description: string;
  setDescription: (description: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

const useCreateAppointmentController = (): ControllerReturn => {
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
  const [totalProjectTime] = useState<string>('');
  const [totalUtilizedTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);

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

    setIsLoading(false);
  };

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
    totalUtilizedTime,
    description,
    setDescription,
    handleSubmit,
    isLoading,
  };
};

export default useCreateAppointmentController;
