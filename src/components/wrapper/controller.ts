import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

interface ControllerReturn {
  name?: string;
  image?: string;
  loading: boolean;
}

const useWrapperController = (): ControllerReturn => {
  const {
    user: { uid, name, photoURL: image, cookies },
    ui: { loading: uiLoading },
  } = useSelector((state) => state);
  const router = useRouter();
  const [loading, setLoading] = useState(uiLoading);

  if (!uid) {
    void router.push(routes.home());
    setLoading(true);
  }

  if (!cookies) {
    void router.push(routes.timesheetLogin());
    setLoading(true);
  }

  return { name, image, loading };
};

export default useWrapperController;
