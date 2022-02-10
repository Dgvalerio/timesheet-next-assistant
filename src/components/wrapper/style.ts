import { Box } from '@mui/material';

import styled from 'styled-components';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;

  .MuiGrid-root {
    margin: 0;

    .MuiGrid-item:not(.logo) {
      padding: 0;
    }

    &.main {
      flex: 1;
    }
  }
`;

const WrapperStyles = { Container };

export default WrapperStyles;
