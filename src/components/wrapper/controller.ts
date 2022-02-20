import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

import Protocol from 'devtools-protocol';

interface ControllerReturn {
  name?: string;
  image?: string;
  loading: boolean;
  uid?: string;
  cookies?: Protocol.Network.Cookie[];
  goHome: () => void;
  goTimesheetLogin: () => void;
}

const useWrapperController = (): ControllerReturn => {
  const {
    user: { uid, name, photoURL: image, cookies },
    ui: { loading },
  } = useSelector((state) => state);
  const router = useRouter();

  const goHome = () => void router.push(routes.home());

  const goTimesheetLogin = () => void router.push(routes.timesheetLogin());

  return { uid, cookies, name, image, loading, goHome, goTimesheetLogin };
};

export default useWrapperController;
