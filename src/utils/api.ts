import { WrapperApi } from '@/types/api';

import axios, { AxiosResponse } from 'axios';

interface API {
  wrapper: {
    account: {
      login: (
        data: WrapperApi.SignIn.Request
      ) => Promise<AxiosResponse<WrapperApi.SignIn.Response>>;
    };
  };
}

const api: API = {
  wrapper: {
    account: {
      login: (data) => axios.post('/api/wrapper/sign-in', data),
    },
  },
};

export default api;
