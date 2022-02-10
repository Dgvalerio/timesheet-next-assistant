import { Grid } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Grid)`
  z-index: 9999;
  box-shadow: 0 0 2px #c8cbd9;

  > .logo {
    background-color: #f1f2f7;
    padding: 0.7rem 2rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const SideBarStyles = { Container };

export default SideBarStyles;
