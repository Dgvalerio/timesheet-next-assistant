import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { routes } from '@/utils/routes';

import styled from 'styled-components';

const Container = styled.h1`
  margin: auto;
  text-align: center;
`;

const Authenticator: NextPage = ({ children }) => {
  const router = useRouter();
  const { cookies } = useSelector((state) => state.user);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cookies || cookies.length === 0) {
      setAuthenticated(false);
      setLoading(false);
    } else {
      setAuthenticated(true);
      setLoading(false);
    }
  }, [cookies, router]);

  if (loading) return <h1>Loading...</h1>;
  if ('wrapper' !== router.pathname.split('/')[1]) return <>{children}</>;

  const isPrivate = router.pathname !== routes.wrapper.account.login();

  if (authenticated) {
    if (isPrivate) {
      return <>{children}</>;
    } else {
      if (router.pathname !== routes.wrapper.worksheet.read())
        void router.push(routes.wrapper.worksheet.read());

      return (
        <Container>I do not have permission to access this page!</Container>
      );
    }
  } else {
    if (isPrivate) {
      if (router.pathname !== routes.wrapper.account.login())
        void router.push(routes.wrapper.account.login());

      return (
        <Container>I do not have permission to access this page!</Container>
      );
    } else {
      return <>{children}</>;
    }
  }
};

export default Authenticator;
