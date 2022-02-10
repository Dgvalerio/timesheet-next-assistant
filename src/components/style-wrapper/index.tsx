import React, { FC } from 'react';

import useStyleWrapperController from '@/components/style-wrapper/controller';
import GlobalStyle from '@/styles/global';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiProvider } from '@mui/material/styles';

import { ThemeProvider as StyledProvider } from 'styled-components';

const StyleWrapper: FC = ({ children }) => {
  const { theme } = useStyleWrapperController();

  return (
    <MuiProvider theme={theme}>
      <CssBaseline />
      <StyledProvider theme={theme}>
        {children}
        <GlobalStyle />
      </StyledProvider>
    </MuiProvider>
  );
};

export default StyleWrapper;
