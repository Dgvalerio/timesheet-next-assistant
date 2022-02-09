import type { NextPage } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, signIn, signOut } from 'next-auth/react';
import { LiteralUnion } from 'next-auth/react/types';

import Loading from '@/components/loading';
import useHomeController from '@/views/home/controller';
import Styles from '@/views/home/style';

export interface HomeParams {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}

const Home: NextPage<HomeParams> = ({ providers }) => {
  const { session, status } = useHomeController();

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
      <h1>To Timesheet</h1>
      Signed in as {session.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </Styles.Container>
  );
};

export default Home;
