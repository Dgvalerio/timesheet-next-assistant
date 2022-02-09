import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    outline: none;
    font-family: "Helvetica Neue", Helvetica, "Noto Sans", sans-serif;
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
