import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { disableLoading, enableLoading } from '@/store/ui/actions';
import { Load } from '@/store/ui/slice';
import { signUp } from '@/store/user/actions';
import { routes } from '@/utils/routes';

export interface FormAuthData extends HTMLFormElement {
  userName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  passwordConfirmation: HTMLInputElement;
}

interface ControllerReturn {
  goBack: () => void;
  handleSubmit: (event: FormEvent<FormAuthData>) => void;
  loading: Load[];
}

const useSignUpController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const goBack = () => {
    dispatch(enableLoading({ toLoad: Load.Page }));
    void router.push(routes.home());
  };

  const goDashboard = () => {
    dispatch(enableLoading({ toLoad: Load.Page }));
    void router.push(routes.dashboard());
  };

  const handleSubmit = async (event: FormEvent<FormAuthData>) => {
    event.preventDefault();

    const { userName, email, password, passwordConfirmation } =
      event.currentTarget;

    if (!userName) return toast.error('O nome precisa ser informado!');
    if (!email) return toast.error('O e-mail precisa ser informado!');
    if (!password) return toast.error('A senha precisa ser informada!');
    if (!passwordConfirmation)
      return toast.error('Uma confirmação de senha precisa ser informada!');

    if (password.value !== passwordConfirmation.value)
      return toast.error('A senha e a confirmação de senha são diferentes!');

    dispatch(signUp(userName.value, email.value, password.value, goDashboard));
  };

  useEffect(() => {
    dispatch(disableLoading({ toLoad: Load.Page }));
  }, [dispatch]);

  return { goBack, handleSubmit, loading };
};

export default useSignUpController;
