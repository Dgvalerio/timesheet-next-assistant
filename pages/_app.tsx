import { Provider } from 'react-redux';

import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { toPersist, store } from '@/store';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';

import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <ThemeProvider theme={theme}>
    <Head>
      <meta charSet="utf-8" />
      <title>Timesheet Assistant</title>
      <meta
        name="description"
        content="The assistant for timesheet, and an clone."
      />
      <link rel="icon" href="/fav.png" />
    </Head>
    <Provider store={store}>
      <PersistGate persistor={toPersist}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
    <GlobalStyle />
  </ThemeProvider>
);

export default MyApp;
