import { FormEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { WrapperApi } from '@/types/api';
import { routes } from '@/utils/routes';

import axios from 'axios';

type ControllerReturn = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
};

const useLoginController = (): ControllerReturn => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    console.log('handleSubmit', { email, password });

    try {
      const response = await axios.post<
        never,
        never,
        WrapperApi.SignIn.Request
      >('/api/wrapper/sign-in', { login: email, password });

      console.log({ response });
      await router.push(routes.wrapper.worksheet.read());
    } catch (e) {
      console.error({ e });
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit, isLoading };
};

export default useLoginController;
