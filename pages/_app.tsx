import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { store } from '@/store';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';

import { ThemeProvider } from 'styled-components';

const MyApp = ({ Component, pageProps }: AppProps) => (
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
      <Component {...pageProps} />
    </Provider>
    <GlobalStyle />
  </ThemeProvider>
);

export default MyApp;
