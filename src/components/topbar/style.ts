import { UserStore } from '@/store/user/slice';
import { Grid } from '@mui/material';

import { transparentize } from 'polished';
import styled from 'styled-components';

const Container = styled(Grid)`
  z-index: 9999;
  box-shadow: 0 0 2px
    ${({ theme }) =>
      theme.palette.mode === UserStore.ThemeMode.Light
        ? '#c8cbd9'
        : transparentize(0.8, '#c8cbd9')};

  > .logo {
    background-color: ${({ theme }) =>
      theme.palette.mode === UserStore.ThemeMode.Light
        ? '#f1f2f7'
        : transparentize(0.98, '#f1f2f7')};
    padding: 0.7rem 2rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const SideBarStyles = { Container };

export default SideBarStyles;
