import { FormEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { routes } from '@/src/utils/routes';

type ControllerReturn = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (event: FormEvent) => void;
};

const useLoginController = (): ControllerReturn => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    void router.push(routes.wrapper.worksheet.read());
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};

export default useLoginController;
