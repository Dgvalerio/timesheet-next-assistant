import React from 'react';

import { NextPage } from 'next';

import Wrapper from '@/components/wrapper';
import useReadAppointmentsController from '@/views/appointment/read/controller';
import Styles from '@/views/appointment/read/style';
import { Grid, Typography, CircularProgress, Backdrop } from '@mui/material';

const ReadAppointments: NextPage = () => {
  const { isLoading } = useReadAppointmentsController();

  return (
    <Wrapper>
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Seus apontamentos</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            justifyContent="space-between"
          />
        </Grid>
      </Styles.Container>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrapper>
  );
};

export default ReadAppointments;
