import { toast } from 'react-toastify';

import { app } from '@/config/firebase';
import { disableLoading, enableLoading } from '@/store/ui/actions';
import { Load } from '@/store/ui/slice';
import { actions } from '@/store/user/slice';
import { FirebaseError } from '@firebase/util';
import { Typography } from '@mui/material';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { Action, Dispatch } from 'redux';

const { setCookies, setUserData, clearUserData } = actions;

const signIn =
  (email: string, password: string, toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading({ toLoad: Load.SignIn }));

    try {
      const auth = await getAuth(app);

      await signInWithEmailAndPassword(auth, email, password);

      if (!auth.currentUser) throw new Error();

      await dispatch(
        setUserData({
          uid: auth.currentUser.uid || '',
          name: auth.currentUser.displayName || '',
          email: auth.currentUser.email || '',
          photoURL: auth.currentUser.photoURL || '',
        })
      );

      toRedirect();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.warn({ errorCode: error.code });
        switch (error.code) {
          case 'auth/user-not-found':
            toast.error('Esse usuário não foi cadastrado!');
            break;
          default:
            toast.error('Erro ao realizar login!');
        }
      } else {
        toast.error('Erro ao realizar login!');
        console.warn({ error });
      }
    } finally {
      dispatch(disableLoading({ toLoad: Load.SignIn }));
    }
  };

const googleSignIn =
  (toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading({ toLoad: Load.SignIn }));

    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      if (!result.user) throw new Error();

      await dispatch(
        setUserData({
          uid: result.user.uid || '',
          name: result.user.displayName || '',
          email: result.user.email || '',
          photoURL: result.user.photoURL || '',
        })
      );

      toRedirect();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.warn({ errorCode: error.code });
        switch (error.code) {
          case 'auth/user-not-found':
            toast.error('Esse usuário não foi cadastrado!');
            break;
          default:
            toast.error('Erro ao realizar login com o Google!');
        }
      } else {
        toast.error('Erro ao realizar login com o Google!');
        console.warn({ error });
      }
    } finally {
      await dispatch(disableLoading({ toLoad: Load.SignIn }));
    }
  };

const githubSignIn =
  (toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading({ toLoad: Load.SignIn }));

    try {
      const provider = new GithubAuthProvider();

      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      if (!result.user) throw new Error();

      await dispatch(
        setUserData({
          uid: result.user.uid || '',
          name: result.user.displayName || '',
          email: result.user.email || '',
          photoURL: result.user.photoURL || '',
        })
      );

      toRedirect();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.warn({ errorCode: error.code });
        switch (error.code) {
          case 'auth/user-not-found':
            toast.error('Esse usuário não foi cadastrado!');
            break;
          default:
            toast.error('Erro ao realizar login com o Github!');
        }
      } else {
        toast.error('Erro ao realizar login com o Github!');
        console.warn({ error });
      }
    } finally {
      await dispatch(disableLoading({ toLoad: Load.SignIn }));
    }
  };

const signUp =
  (name: string, email: string, password: string, toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading({ toLoad: Load.SignUp }));

    try {
      const auth = await getAuth(app);

      await createUserWithEmailAndPassword(auth, email, password);

      if (!auth.currentUser) throw new Error();

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      await dispatch(
        setUserData({
          uid: auth.currentUser.uid || '',
          name: auth.currentUser.displayName || '',
          email: auth.currentUser.email || '',
          photoURL: auth.currentUser.photoURL || '',
        })
      );

      toRedirect();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.warn({ errorCode: error.code });
        switch (error.code) {
          case 'auth/weak-password':
            toast.error(
              <>
                <Typography variant="caption">
                  Essa senha é muito fraca
                </Typography>
                <Typography variant="body1">
                  A senha deve ter mais de 6 dígitos!
                </Typography>
              </>
            );
            break;
          case 'auth/email-already-in-use':
            toast.error('Esse e-mail já foi cadastrado!');
            break;
          default:
            toast.error('Erro ao realizar cadastro!');
        }
      } else {
        toast.error('Erro ao realizar cadastro!');
        console.warn({ error });
      }
    } finally {
      await dispatch(disableLoading({ toLoad: Load.SignUp }));
    }
  };

const signOut =
  (toRedirect: () => void) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    await dispatch(enableLoading({ toLoad: Load.SignOut }));

    try {
      const auth = await getAuth(app);

      await auth.signOut();
      await dispatch(clearUserData());

      toRedirect();
    } catch (error) {
      console.warn({ error });
      toast.error('Erro ao sair!');
    } finally {
      await dispatch(disableLoading({ toLoad: Load.SignOut }));
    }
  };

export { setCookies, signUp, signIn, signOut, googleSignIn, githubSignIn };
