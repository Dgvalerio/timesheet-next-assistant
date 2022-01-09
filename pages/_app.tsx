import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

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
    <Component {...pageProps} />
    <GlobalStyle />
  </ThemeProvider>
);

export default MyApp;
