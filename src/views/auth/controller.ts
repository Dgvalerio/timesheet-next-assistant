import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { githubSignIn, googleSignIn, signIn } from '@/store/user/actions';
import { routes } from '@/utils/routes';

export interface FormAuthData extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface ControllerReturn {
  goHome: () => void;
  goSignUp: () => void;
  handleGithubSignIn: () => void;
  handleGoogleSignIn: () => void;
  handleSubmit: (event: FormEvent<FormAuthData>) => void;
  loading: boolean;
  uid?: string;
}

const useAuthController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    user: { uid },
    ui: { loading },
  } = useSelector((state) => state);

  const goHome = () => void router.push(routes.dashboard());

  const goSignUp = () => void router.push(routes.signUp());

  const handleGithubSignIn = () => {
    dispatch(githubSignIn(goHome));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignIn(goHome));
  };

  const handleSubmit = async (event: FormEvent<FormAuthData>) => {
    event.preventDefault();

    const { email, password } = event.currentTarget;

    dispatch(signIn(email.value, password.value, goHome));
  };

  return {
    goHome,
    goSignUp,
    handleGithubSignIn,
    handleGoogleSignIn,
    handleSubmit,
    loading,
    uid,
  };
};

export default useAuthController;
