import React, { FC } from 'react';

import { signOut } from 'next-auth/react';

import useTopBarController from '@/components/topbar/controller';
import Styles from '@/components/topbar/style';
import { UserStore } from '@/store/user/slice';
import {
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';

const TopBar: FC<{ user: { name?: string | null; image?: string | null } }> = ({
  user,
}) => {
  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleSwitchThemeMode,
    nextThemeMode,
  } = useTopBarController();

  return (
    <Styles.Container
      container
      className="top-bar"
      justifyContent="space-between"
    >
      <Grid item xs={3} className="logo">
        <Typography variant="h6">Timesheet</Typography>
      </Grid>
      <Grid item>
        <Tooltip title={`Trocar para ${nextThemeMode} mode`}>
          <IconButton
            size="large"
            aria-label={`Trocar para ${nextThemeMode} mode`}
            color="inherit"
            onClick={handleSwitchThemeMode}
          >
            {nextThemeMode === UserStore.ThemeMode.Dark ? (
              <LightModeIcon color="disabled" />
            ) : (
              <DarkModeIcon color="disabled" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver notificações">
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon color="disabled" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Abrir opções">
          <IconButton onClick={handleOpenUserMenu} className="user-button">
            <Avatar alt={user.name || ''} src={user.image || ''} />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Typography textAlign="center">Sair</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </Styles.Container>
  );
};

export default TopBar;
