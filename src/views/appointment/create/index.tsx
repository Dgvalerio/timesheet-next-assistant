import React from 'react';

import { NextPage } from 'next';

import Wrapper from '@/components/wrapper';
import CreateForm from '@/views/appointment/create/components/create';
import useCreateAppointmentController, {
  CreateAppointmentLoad,
} from '@/views/appointment/create/controller';
import Styles from '@/views/appointment/create/style';
import { Backdrop, CircularProgress, Grid, Typography } from '@mui/material';

const CreateAppointment: NextPage = () => {
  const { onLoading, setOnLoading } = useCreateAppointmentController();

  return (
    <Wrapper>
      <Styles.Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Novo apontamento</Typography>
          </Grid>
          <CreateForm onLoading={onLoading} setOnLoading={setOnLoading} />
        </Grid>
      </Styles.Container>
      <Backdrop open={onLoading.includes(CreateAppointmentLoad.Submit)}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrapper>
  );
};

export default CreateAppointment;
