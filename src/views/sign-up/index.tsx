import type { NextPage } from 'next';

import Styles from '@/views/auth/style';
import useSignUpController from '@/views/sign-up/controller';
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const SignUp: NextPage = () => {
  const { goBack, handleSubmit, loading } = useSignUpController();

  return (
    <Styles.Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <Typography variant="h1">Cadastro</Typography>
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
              name="userName"
              label="Nome"
              variant="outlined"
              type="text"
              required
              fullWidth
            />
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              name="passwordConfirmation"
              label="Confirmação de Senha"
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
            <Button variant="outlined" type="button" onClick={goBack}>
              Voltar
            </Button>
          </Grid>

          <Grid item>
            <Button variant="outlined" type="submit">
              Cadastrar
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

export default SignUp;
