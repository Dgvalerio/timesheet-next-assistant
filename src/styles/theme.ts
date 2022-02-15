import { UIStore } from '@/store/ui/slice';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: UIStore.ThemeMode.Dark,
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
