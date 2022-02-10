import React, { FC } from 'react';

import Loading from '@/components/loading';
import SideBar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import useWrapperController from '@/components/wrapper/controller';
import Styles from '@/components/wrapper/style';
import { Grid } from '@mui/material';

const Wrapper: FC = ({ children }) => {
  const { session, status, goHome } = useWrapperController();

  if (status === 'loading') return <Loading />;

  if (status === 'unauthenticated') goHome();

  if (!session || !session.user) return <Loading />;

  return (
    <Styles.Container>
      <TopBar user={session.user} />
      <Grid container className="main">
        <SideBar />
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Styles.Container>
  );
};

export default Wrapper;
