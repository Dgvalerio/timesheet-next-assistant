export enum Routes {
  Home = `/`,
  Dashboard = `/dashboard`,
  AppointmentCreate = `/appointment/create`,

  WrapperAccountLogin = `/wrapper/Account/Login`,
  WrapperWorksheetRead = `/wrapper/Worksheet/Read`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  dashboard: (): Routes => Routes.Dashboard,
  appointment: {
    create: (): Routes => Routes.AppointmentCreate,
  },
  wrapper: {
    account: {
      login: (): Routes => Routes.WrapperAccountLogin,
    },
    worksheet: {
      read: (): Routes => Routes.WrapperWorksheetRead,
    },
  },
};
