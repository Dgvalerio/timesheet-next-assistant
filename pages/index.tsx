import { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';

import Home, { HomeParams } from '@/views/auth';

export const getServerSideProps: GetServerSideProps<HomeParams> = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default Home;
