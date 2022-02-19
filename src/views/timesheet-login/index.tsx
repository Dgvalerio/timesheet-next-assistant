import React from 'react';

import type { NextPage } from 'next';

import Styles from '@/views/auth/style';
import useTimesheetLoginController from '@/views/timesheet-login/controller';
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

const TimesheetLogin: NextPage = () => {
  const { handleSubmit, loading } = useTimesheetLoginController();

  return (
    <Styles.Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Typography variant="h2">Timesheet Login</Typography>
          <Typography variant="body1">
            Ao que parece, é a primeira vez que você acessa o sistema, ou você
            escolheu não salvar seu acesso do Timesheet, sendo assim, faz-se
            necessário realizar novamente o login do Timesheet:
          </Typography>
        </Grid>
        <Grid
          item
          xs={7}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
          aria-autocomplete="none"
        >
          <Grid item xs={12}>
            <TextField
              name="email"
              label="E-mail"
              variant="outlined"
              type="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Senha"
              variant="outlined"
              type="password"
              inputProps={{ minLength: '6' }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Ao deixar o acesso salvo, o login será feito automaticamente toda vez que for necessário">
              <FormControlLabel
                control={<Checkbox name="keepSave" />}
                label="Deixar acesso salvo"
              />
            </Tooltip>
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            <Button variant="outlined" type="submit">
              Seguir
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Styles.Container>
  );
};

export default TimesheetLogin;
