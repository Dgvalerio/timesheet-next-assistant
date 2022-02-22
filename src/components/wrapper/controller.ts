import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { UserPreferences } from '@/services/firestore/UserPreferences/Controller';
import { ScrapperApi } from '@/services/scrapperApi';
import { disableLoading, enableLoading } from '@/store/ui/actions';
import { setCookies } from '@/store/user/actions';
import { routes } from '@/utils/routes';

import Protocol from 'devtools-protocol';

interface ControllerReturn {
  name?: string;
  image?: string;
  loading: boolean;
  uid?: string;
  cookies?: Protocol.Network.Cookie[];
  goHome: () => void;
  loadUserPreferences: () => void;
}

const useWrapperController = (): ControllerReturn => {
  const {
    user: { uid, name, photoURL: image, cookies },
    ui: { loading },
  } = useSelector((state) => state);
  const router = useRouter();
  const dispatch = useDispatch();

  const goHome = () => void router.push(routes.home());

  const goTimesheetLogin = () => void router.push(routes.timesheetLogin());

  const loadUserPreferences = async () => {
    if (!uid) return;
    dispatch(enableLoading());
    const userPreferences = await UserPreferences.getTimesheetLogin(uid);

    if (userPreferences) {
      try {
        const { cookies } = await ScrapperApi.signIn({
          login: userPreferences.email,
          password: userPreferences.password,
        });

        if (!cookies) throw new Error('Cookies not found!');

        dispatch(setCookies({ cookies }));
      } catch (e) {
        toast.error(JSON.stringify(e));
        goTimesheetLogin();
      }
    } else {
      goTimesheetLogin();
    }

    dispatch(disableLoading());
  };

  return { uid, cookies, name, image, loading, goHome, loadUserPreferences };
};

export default useWrapperController;
