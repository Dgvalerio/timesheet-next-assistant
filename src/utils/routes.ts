export const routes = {
  home: (): string => `/`,
  dashboard: (): string => `/dashboard`,
  wrapper: {
    account: {
      login: (): string => `/wrapper/Account/Login`,
    },
    worksheet: {
      read: (): string => `/wrapper/Worksheet/Read`,
    },
  },
};
