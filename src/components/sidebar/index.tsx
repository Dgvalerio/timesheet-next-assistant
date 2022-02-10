import { FC, ReactElement } from 'react';

import Styles from '@/components/sidebar/style';
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

const Item: FC<{ selected?: boolean; text: string; icon: ReactElement }> = ({
  selected,
  text,
  icon,
}) => (
  <ListItemButton selected={selected}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
);

const SideBar: FC = () => (
  <Styles.Container item xs={3}>
    <List subheader={<ListSubheader>Apontamentos</ListSubheader>}>
      <Item selected icon={<DashboardIcon />} text="Dashboard" />
      <Item icon={<AddIcon />} text="Incluir" />
      <Item icon={<ViewListIcon />} text="Visualizar" />
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
