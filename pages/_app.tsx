import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import StyleWrapper from '@/components/style-wrapper';
import { toPersist, store } from '@/store';

import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.min.css';

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>Timesheet Assistant</title>
      <meta
        name="description"
        content="The assistant for timesheet, and an clone."
      />
      <link rel="icon" href="/fav.png" />
    </Head>
    <ReduxProvider store={store}>
      <PersistGate persistor={toPersist}>
        <SessionProvider session={session}>
          <StyleWrapper>
            <Component {...pageProps} />
            <ToastContainer />
          </StyleWrapper>
        </SessionProvider>
      </PersistGate>
    </ReduxProvider>
  </>
);

export default MyApp;
