import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { NextPage } from 'next';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';

import StyleWrapper from '@/components/style-wrapper';
import { toPersist, store } from '@/store';

import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.min.css';

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  const body = JSON.stringify(metric);
  const url = 'https://vercel.com/dgvalerio/timesheet-next-assistant/analytics';

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    void fetch(url, { body, method: 'POST', keepalive: true });
  }

  console.log(metric);

  return metric;
};

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
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
        <StyleWrapper>
          <Component {...pageProps} />
          <ToastContainer />
        </StyleWrapper>
      </PersistGate>
    </ReduxProvider>
  </>
);

export default MyApp;
