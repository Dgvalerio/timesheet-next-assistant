import { Grid } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Grid)`
  background-color: #f1f2f7;

  .MuiList-root {
    padding: 1rem;

    .MuiListSubheader-root {
      background-color: transparent;
      text-transform: uppercase;
      font-size: 11px;
    }

    .MuiListItemButton-root {
      border-radius: 0.4rem;
      color: ${({ theme }) => theme.palette.text.secondary};

      &.Mui-selected {
        color: ${({ theme }) => theme.palette.primary.main};

        svg {
          fill: ${({ theme }) => theme.palette.primary.main};
        }
      }

      .MuiListItemIcon-root {
        min-width: auto;
        margin-right: 0.8rem;
      }
    }
  }
`;

const SideBarStyles = { Container };

export default SideBarStyles;
