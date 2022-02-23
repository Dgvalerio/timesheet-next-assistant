import { FC, ReactElement } from 'react';

import { useRouter } from 'next/router';

import Styles from '@/components/sidebar/style';
import { Routes, routes } from '@/utils/routes';
import {
  MoreTime as AddIcon,
  ViewList as ViewListIcon,
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  ContactPage as ContactPageIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Timelapse as TimelapseIcon,
} from '@mui/icons-material';
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const Item: FC<{
  text: string;
  icon: ReactElement;
  route?: Routes;
}> = ({ text, icon, route }) => {
  const router = useRouter();

  const navigate = () => router.push(route || routes.home());

  const selected = (): boolean => router.pathname === route;

  return (
    <ListItemButton selected={selected()} onClick={navigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const SideBar: FC = () => (
  <Styles.Container item xs={3}>
    <List subheader={<ListSubheader>Apontamentos</ListSubheader>}>
      <Item
        icon={<DashboardIcon />}
        text="Dashboard"
        route={routes.dashboard()}
      />
      <Item
        icon={<AddIcon />}
        text="Incluir"
        route={routes.appointment.create()}
      />
      <Item
        icon={<ViewListIcon />}
        text="Visualizar"
        route={routes.appointment.read()}
      />
    </List>
    <List subheader={<ListSubheader>Relatórios</ListSubheader>}>
      <Item icon={<DescriptionIcon />} text="Notas Fiscais" />
      <Item icon={<AttachMoneyIcon />} text="Pagamentos" />
      <Item icon={<TimelapseIcon />} text="Relatório de Horas" />
      <Item icon={<ContactPageIcon />} text="Ocupação do Time" />
      <Item icon={<PlaylistAddCheckIcon />} text="Aprovação de Horas" />
    </List>
  </Styles.Container>
);

export default SideBar;
