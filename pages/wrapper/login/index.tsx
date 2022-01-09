import React, { FC, useState } from 'react';

import Icon from '../../../components/icon';
import { LoginStyles as Styles } from './styles';

type ControllerReturn = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
};

const useLoginController = (): ControllerReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    alert(JSON.stringify({ email, password }));
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};

const Login: FC = () => {
  const { email, setEmail, password, setPassword, handleSubmit } =
    useLoginController();

  return (
    <Styles.Container>
      <section>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://luby-timesheet.azurewebsites.net/Content/custom/image/logo/timesheet_login.png"
            alt="Timesheet Azure Logo"
            width={215}
            height={94}
          />
          <p>
            Caro usuário, faça o login para acessar a área de administração!
          </p>
        </div>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <Icon.User />
            <input
              type="email"
              value={email}
              placeholder="Digite seu login"
              onChange={({ target: { value } }) => setEmail(value)}
              required
            />
          </div>
          <div>
            <Icon.Key />
            <input
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={({ target: { value } }) => setPassword(value)}
              required
            />
          </div>
          <button type="submit">
            Login In
            <Icon.SignIn />
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Esqueceu sua senha?</a>
        </form>
      </section>
    </Styles.Container>
  );
};

export default Login;
