import { useState, MouseEvent } from 'react';

interface ControllerReturn {
  anchorElUser?: null | HTMLElement;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

const useTopBarController = (): ControllerReturn => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return { anchorElUser, handleOpenUserMenu, handleCloseUserMenu };
};

export default useTopBarController;
