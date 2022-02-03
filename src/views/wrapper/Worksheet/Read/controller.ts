import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

interface ControllerReturn {
  logout: () => void;
}

const useWorksheetReadController = (): ControllerReturn => {
  const router = useRouter();

  const logout = () => {
    void router.push(routes.wrapper.account.login());
  };

  return { logout };
};

export default useWorksheetReadController;
