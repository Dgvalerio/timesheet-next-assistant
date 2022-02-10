import { useState, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchThemeMode } from '@/store/user/actions';
import { UserStore } from '@/store/user/slice';

interface ControllerReturn {
  anchorElUser?: null | HTMLElement;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleSwitchThemeMode: () => void;
  nextThemeMode: UserStore.ThemeMode;
}

const useTopBarController = (): ControllerReturn => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();
  const [nextThemeMode, setNextThemeMode] = useState<UserStore.ThemeMode>(
    themeMode === UserStore.ThemeMode.Light
      ? UserStore.ThemeMode.Dark
      : UserStore.ThemeMode.Light
  );

  useEffect(() => {
    setNextThemeMode(
      themeMode === UserStore.ThemeMode.Light
        ? UserStore.ThemeMode.Dark
        : UserStore.ThemeMode.Light
    );
  }, [themeMode]);

  const handleSwitchThemeMode = () => {
    dispatch(switchThemeMode());
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    nextThemeMode,
    handleSwitchThemeMode,
  };
};

export default useTopBarController;
