import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface ControllerReturn {
  session: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
}

const useHomeController = (): ControllerReturn => {
  const { data: session, status } = useSession();

  return { session, status };
};

export default useHomeController;
