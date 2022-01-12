export const routes = {
  home: (): string => `/`,
  wrapper: {
    account: {
      login: (): string => `/wrapper/Account/Login`,
    },
    worksheet: {
      read: (): string => `/wrapper/Worksheet/Read`,
    },
  },
};
