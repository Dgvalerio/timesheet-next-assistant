import React, { FC } from 'react';

import Loading from '@/components/loading';
import SideBar from '@/components/sidebar';
import TopBar from '@/components/topbar';
import useWrapperController from '@/components/wrapper/controller';
import Styles from '@/components/wrapper/style';
import { Grid } from '@mui/material';

const Wrapper: FC = ({ children }) => {
  const { uid, cookies, name, image, loading, goHome, goTimesheetLogin } =
    useWrapperController();

  if (!uid) {
    goHome();
    return <Loading />;
  }

  if (!cookies) {
    goTimesheetLogin();
    return <Loading />;
  }

  if (loading) return <Loading />;

  return (
    <Styles.Container>
      <TopBar name={name} image={image} />
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
