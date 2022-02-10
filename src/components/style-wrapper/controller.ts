import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import globalTheme from '@/styles/theme';
import { createTheme } from '@mui/material';

interface ControllerReturn {
  theme: typeof globalTheme;
}

const useStyleWrapperController = (): ControllerReturn => {
  const [theme, setTheme] = useState(globalTheme);

  const { themeMode } = useSelector((state) => state.user);

  useEffect(() => {
    setTheme(createTheme({ palette: { mode: themeMode } }));
  }, [themeMode]);

  return { theme };
};

export default useStyleWrapperController;
