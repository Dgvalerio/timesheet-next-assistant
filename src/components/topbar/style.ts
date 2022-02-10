import { Grid } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Grid)`
  z-index: 9999;
  box-shadow: 0 0 2px #c8cbd9;

  > .logo {
    background-color: #f1f2f7;
    padding: 1rem 2rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .user-button {
    width: 4rem;
    height: 4rem;
  }
`;

const SideBarStyles = { Container };

export default SideBarStyles;
