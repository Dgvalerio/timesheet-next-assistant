import { UserStore } from '@/store/user/slice';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: UserStore.ThemeMode.Dark,
  },
});

export const azureTheme = {
  colors: {
    backgroundLight: '#373e4a',
    backgroundDark: '#303641',
    text: '#949494',
  },
};

export default theme;
