import type { NextPage } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, signIn, signOut } from 'next-auth/react';
import { LiteralUnion } from 'next-auth/react/types';

import Loading from '@/components/loading';
import useAuthController from '@/views/auth/controller';
import Styles from '@/views/auth/style';

export interface AuthParams {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}

const Auth: NextPage<AuthParams> = ({ providers }) => {
  const { session, status } = useAuthController();

  if (status === 'loading' || !providers) return <Loading />;

  if (!session || status === 'unauthenticated') {
    return (
      <Styles.Container>
        <h1>Bem vindo ao timesheet!</h1>
        <h2>
          Para utilizar o sistema faça login com o <b>Github</b>
        </h2>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Conectar com {provider.name}
            </button>
          </div>
        ))}
      </Styles.Container>
    );
  }

  return (
    <Styles.Container>
      <h1>Bem vindo ao Timesheet</h1>
      <p>
        Você está logado como <i>{session.user?.email}</i>
      </p>
      <button onClick={() => signOut()}>Sair</button>
    </Styles.Container>
  );
};

export default Auth;
