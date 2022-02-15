import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

interface ControllerReturn {
  uid?: string;
  name?: string;
  image?: string;
  loading: boolean;
  goHome: () => void;
}

const useWrapperController = (): ControllerReturn => {
  const {
    user: { uid, name, photoURL: image },
    ui: { loading },
  } = useSelector((state) => state);
  const router = useRouter();

  const goHome = () => void router.push(routes.home());

  return { uid, name, image, loading, goHome };
};

export default useWrapperController;
