import { useState, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { switchThemeMode } from '@/store/ui/actions';
import { UIStore } from '@/store/ui/slice';
import { signOut } from '@/store/user/actions';
import { routes } from '@/utils/routes';

interface ControllerReturn {
  anchorElUser?: null | HTMLElement;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleSwitchThemeMode: () => void;
  nextThemeMode: UIStore.ThemeMode;
  handleSignOut: () => void;
}

const useTopBarController = (): ControllerReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.ui);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();
  const [nextThemeMode, setNextThemeMode] = useState<UIStore.ThemeMode>(
    themeMode === UIStore.ThemeMode.Light
      ? UIStore.ThemeMode.Dark
      : UIStore.ThemeMode.Light
  );

  useEffect(() => {
    setNextThemeMode(
      themeMode === UIStore.ThemeMode.Light
        ? UIStore.ThemeMode.Dark
        : UIStore.ThemeMode.Light
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

  const handleSignOut = () =>
    dispatch(signOut(() => void router.push(routes.home())));

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    nextThemeMode,
    handleSwitchThemeMode,
    handleSignOut,
  };
};

export default useTopBarController;
