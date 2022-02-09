import { Provider as ReduxProvider } from 'react-redux';

import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { toPersist, store } from '@/store';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
import { CssBaseline, ThemeProvider as MuiProvider } from '@mui/material';

import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as StyledProvider } from 'styled-components';

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <>
    <Head>
      <title>Timesheet Assistant</title>
      <meta
        name="description"
        content="The assistant for timesheet, and an clone."
      />
      <link rel="icon" href="/fav.png" />
    </Head>
    <MuiProvider theme={theme}>
      <CssBaseline />
      <StyledProvider theme={theme}>
        <ReduxProvider store={store}>
          <PersistGate persistor={toPersist}>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </PersistGate>
        </ReduxProvider>
        <GlobalStyle />
      </StyledProvider>
    </MuiProvider>
  </>
);

export default MyApp;
