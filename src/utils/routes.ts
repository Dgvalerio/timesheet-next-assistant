export enum Routes {
  Home = `/`,
  SignUp = `/sign-up`,
  Dashboard = `/dashboard`,
  TimesheetLogin = `/timesheet-login`,
  AppointmentCreate = `/appointment/create`,
  AppointmentsRead = `/appointment/read`,

  WrapperAccountLogin = `/wrapper/Account/Login`,
  WrapperWorksheetRead = `/wrapper/Worksheet/Read`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  signUp: (): Routes => Routes.SignUp,
  dashboard: (): Routes => Routes.Dashboard,
  timesheetLogin: (): Routes => Routes.TimesheetLogin,
  appointment: {
    read: (): Routes => Routes.AppointmentsRead,
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
