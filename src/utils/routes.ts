export enum Routes {
  Home = `/`,
  SignUp = `/sign-up`,
  Dashboard = `/dashboard`,
  AppointmentCreate = `/appointment/create`,

  WrapperAccountLogin = `/wrapper/Account/Login`,
  WrapperWorksheetRead = `/wrapper/Worksheet/Read`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  signUp: (): Routes => Routes.SignUp,
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
