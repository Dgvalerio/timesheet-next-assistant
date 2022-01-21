import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Icon from '@/components/icon';
import useLoginController from '@/views/wrapper/Account/Login/controller';
import Styles from '@/views/wrapper/Account/Login/style';

const Login: FC = () => {
  const { email, setEmail, password, setPassword, handleSubmit, isLoading } =
    useLoginController();

  return (
    <Styles.Container>
      <section>
        <div>
          <Image
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
            {isLoading ? 'Loading...' : 'Login In'}
            <Icon.SignIn />
          </button>
          <Link href="/">Esqueceu sua senha?</Link>
        </form>
      </section>
    </Styles.Container>
  );
};

export default Login;
