import { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';

import Auth, { AuthParams } from '@/views/auth';

export const getServerSideProps: GetServerSideProps<AuthParams> = async () => {
  const providers = await getProviders();

  return { props: { providers } };
};

export default Auth;
