import { darken } from '@mui/system';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    outline: none;
    font-family: "Helvetica Neue", Helvetica, "Noto Sans", sans-serif;

    &::selection {
      background-color: ${({ theme }) => theme.palette.primary.dark};
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    &::-webkit-scrollbar {
      height: 4px;
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) =>
        darken(theme.palette.background.default, 0.2)};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        darken(theme.palette.primary.dark, 0.4)};
      border-radius: 0.6rem;
    }
  }

  body {
    #__next {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 100vw;

      align-items: stretch;
      justify-content: stretch;

      background-color: ${({ theme }) => theme.palette.background.default};
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
