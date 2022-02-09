import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { setCookies } from '@/store/user/actions';
import { routes } from '@/utils/routes';

interface ControllerReturn {
  logout: () => void;
}

const useWorksheetReadController = (): ControllerReturn => {
  const router = useRouter();

  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(setCookies({ cookies: [] }));
    await router.push(routes.wrapper.account.login());
  };

  return { logout };
};

export default useWorksheetReadController;
