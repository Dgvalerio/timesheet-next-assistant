import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { Client } from '@/services/firestore/Client/Controller';
import { UserPreferences } from '@/services/firestore/UserPreferences/Controller';
import { ScrapperApi } from '@/services/scrapperApi';
import { disableLoading, enableLoading } from '@/store/ui/actions';
import { setCookies } from '@/store/user/actions';
import { routes } from '@/utils/routes';

export interface FormAuthData extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
  keepSave: HTMLInputElement;
}

interface ControllerReturn {
  handleSubmit: (event: FormEvent<FormAuthData>) => void;
  loading: boolean;
}

const useTimesheetLoginController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    user: { uid },
    ui: { loading },
  } = useSelector((state) => state);

  const handleSubmit = async (event: FormEvent<FormAuthData>) => {
    event.preventDefault();
    dispatch(enableLoading());

    const {
      keepSave: { checked: keepSave },
      email: { value: email },
      password: { value: password },
    } = event.currentTarget;

    if (!email) return toast.error('O e-mail precisa ser informado!');
    if (!password) return toast.error('A senha precisa ser informada!');

    try {
      const { cookies } = await ScrapperApi.signIn({ login: email, password });

      if (!uid) {
        toast.error('Not authenticated!');
        await router.push(routes.home());
        throw new Error('Not authenticated!');
      }
      if (!cookies) throw new Error('Cookies not found!');

      dispatch(setCookies({ cookies }));

      if (keepSave)
        await UserPreferences.timesheetLogin({ user: uid!, email, password });

      await Client.updateClients(uid, cookies);

      await router.push(routes.dashboard());
    } catch (e) {
      toast.error((<Error>e).message);
      console.log(e);
    } finally {
      dispatch(disableLoading());
    }
  };

  return { handleSubmit, loading };
};

export default useTimesheetLoginController;
