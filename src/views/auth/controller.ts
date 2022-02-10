import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

interface ControllerReturn {
  session: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  goHome: () => void;
}

const useAuthController = (): ControllerReturn => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const goHome = () => void router.push(routes.dashboard());

  return { session, status, goHome };
};

export default useAuthController;
