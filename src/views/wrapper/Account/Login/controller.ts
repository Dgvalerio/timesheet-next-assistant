import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { setCookies } from '@/store/user/actions';
import api from '@/utils/api';
import { routes } from '@/utils/routes';

interface ControllerReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (event: FormEvent) => void;
  isLoading: boolean;
}

const useLoginController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { status, data } = await api.wrapper.account.login({
        login: email,
        password,
      });

      if (status === 200 && data.cookies) {
        dispatch(setCookies({ cookies: data.cookies }));
        console.log({ response: data.cookies });

        await router.push(routes.wrapper.worksheet.read());
      }
    } catch (e) {
      console.error({ e });
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit, isLoading };
};

export default useLoginController;
