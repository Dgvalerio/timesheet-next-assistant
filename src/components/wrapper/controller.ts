import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

interface ControllerReturn {
  session: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  goHome: () => void;
}

const useWrapperController = (): ControllerReturn => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const goHome = () => void router.push(routes.home());

  return { session, status, goHome };
};

export default useWrapperController;
