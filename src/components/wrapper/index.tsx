import React, { FC } from 'react';

import Loading from '@/components/loading';
import SideBar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import useWrapperController from '@/components/wrapper/controller';
import { Grid, Box } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;

  .MuiGrid-root {
    margin: 0;

    .MuiGrid-item:not(.logo) {
      padding: 0;
    }

    &.main {
      flex: 1;
    }
  }
`;

const Wrapper: FC = ({ children }) => {
  const { session, status, goHome } = useWrapperController();

  if (status === 'loading') return <Loading />;

  if (status === 'unauthenticated') goHome();

  if (!session || !session.user) return <Loading />;

  return (
    <Container>
      <TopBar user={session.user} />
      <Grid container className="main">
        <SideBar />
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Wrapper;
