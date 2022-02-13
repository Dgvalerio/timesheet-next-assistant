import { API } from '@/types/api';

import axios from 'axios';

const baseUrl = 'https://timesheet-express-assistant.herokuapp.com';

const api: API = {
  wrapper: {
    account: {
      login: (data) => axios.post(`${baseUrl}/scrapper/sign-in`, data),
    },
    worksheet: {
      read: {
        appointments: (data) =>
          axios.post(`${baseUrl}/scrapper/read-appointments`, data),
        clients: (data) => axios.post(`${baseUrl}/scrapper/read-clients`, data),
      },
      create: {
        appointment: (data) =>
          axios.post(`${baseUrl}/scrapper/create-appointment`, data),
      },
    },
  },
};

export default api;
