import React from 'react';

import type { NextPage } from 'next';

import Loading from '@/components/loading';
import useAuthController from '@/views/auth/controller';
import Styles from '@/views/auth/style';
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const Auth: NextPage = () => {
  const {
    goHome,
    goSignUp,
    handleGithubSignIn,
    handleGoogleSignIn,
    handleSubmit,
    loading,
    uid,
  } = useAuthController();

  if (uid) {
    goHome();
    return <Loading />;
  }

  return (
    <Styles.Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Typography variant="h1">Login</Typography>
        </Grid>
        <Grid
          item
          xs={7}
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
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
              inputProps={{
                minLength: '6',
              }}
              required
              fullWidth
            />
          </Grid>
          <Grid item style={{ marginRight: 'auto' }}>
            <Button variant="outlined" type="button" onClick={goSignUp}>
              Cadastrar
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="button"
              onClick={handleGithubSignIn}
            >
              Login com Github
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="button"
              onClick={handleGoogleSignIn}
            >
              Login com Google
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit">
              Entrar
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

export default Auth;
