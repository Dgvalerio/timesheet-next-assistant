import { API } from '@/types/api';

import axios from 'axios';

const api: API = {
  wrapper: {
    account: {
      login: (data) => axios.post('/api/wrapper/sign-in', data),
    },
    worksheet: {
      read: {
        appointments: (data) =>
          axios.post('/api/wrapper/read-appointments', data),
        clients: (data) => axios.post('/api/wrapper/read-clients', data),
      },
    },
  },
};

export default api;
