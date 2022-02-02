import { API } from '@/types/api';

import axios from 'axios';

const api: API = {
  wrapper: {
    account: {
      login: (data) => axios.post('/api/wrapper/sign-in', data),
    },
    worksheet: {
      read: (data) => axios.post('/api/wrapper/read', data),
    },
  },
};

export default api;
