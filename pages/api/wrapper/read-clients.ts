import { WrapperApi } from '@/types/api';

import axios from 'axios';

const handler: WrapperApi.Read.Clients.Handler = async (req, res) => {
  let requestProgress = 0;

  const loggerProgress = (progressPercentage: number) => {
    requestProgress = progressPercentage;
    console.log(`${requestProgress}% on ${req.url}`);
  };

  loggerProgress(0);

  const post = async () => {
    const cookie: string = req.body.cookies.reduce(
      (previous, { name, value }) => `${previous} ${name}=${value};`,
      ''
    );

    loggerProgress(4);

    const api = axios.create({
      baseURL: 'https://luby-timesheet.azurewebsites.net',
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'x-requested-with': 'XMLHttpRequest',
        cookie,
        Referer: 'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    });

    loggerProgress(6);

    /**
     * ReadCategory
     * @param {number} idProject
     * */
    const listCategories = async (
      idProject: number
    ): Promise<WrapperApi.Read.Clients.Category[]> => {
      try {
        const response = await api.post(
          '/Worksheet/ReadCategory',
          `idproject=${idProject}`
        );

        return response.data;
      } catch (e) {
        console.error('Error on list categories: ', e);
        return [];
      }
    };

    /**
     * ReadProjectProgress
     * @param {number} idProject
     * */
    const showProjectProgress = async (
      idProject: number
    ): Promise<WrapperApi.Read.Clients.ProjectProgress> => {
      try {
        const response = await api.post(
          '/Worksheet/ReadProjectProgress',
          `idproject=${idProject}`
        );

        return response.data;
      } catch (e) {
        console.error('Error on show project progress: ', idProject);
        return {
          Budget: 0,
          CellName: null,
          ConsumedTimeInProject: '',
          CustomerName: '',
          EndDate: '',
          HourLimitPerMonth: null,
          Id: 0,
          IdCell: null,
          IdCustomer: 0,
          IdProject: idProject,
          IsMaintenance: false,
          NotMonetize: false,
          ProjectName: '',
          StartDate: '',
          TotalTime: '',
          TotalTimeInProject: '',
          TotalTimeMounth: '',
        };
      }
    };

    /**
     * ReadProject
     * @param {number} idCustomer
     * */
    const listProjects = async (
      idCustomer: number
    ): Promise<WrapperApi.Read.Clients.Project[]> => {
      try {
        loggerProgress(20);
        const { data } = await api.post<
          {
            Id: number;
            Name: string;
            StartDate: string;
            EndDate: string;
            IdCustomer: number;
          }[]
        >('/Worksheet/ReadProject', `idcustomer=${idCustomer}`);

        const projects = await data.map(async (project, index) => {
          const categories = await listCategories(project.Id);
          loggerProgress(+`30.${index}`);
          const progress = await showProjectProgress(project.Id);
          loggerProgress(+`40.${index}`);

          return { ...project, categories, progress };
        });

        loggerProgress(70);
        return await Promise.all(projects);
      } catch (e) {
        console.error('Error on list projects: ', e);
        return [];
      }
    };

    /**
     * Read
     * */
    const listClients = async () => {
      try {
        loggerProgress(10);
        const response = await api.get('/Worksheet/Read');

        const html: string = response.data;

        const regex = /(name="IdCustomer">)([\w\W]+?)(<\/select>)/gm;

        const search: string = (html.match(regex) || [''])[0];

        const cleanedSearch = search.split(/\r\n/gm).join('');

        const values = cleanedSearch.match(/value="([\S\s]+?)??">([\S\s]+?)</g);

        if (!values) {
          if (html.match('<div class="login-content">')) {
            res.status(401).json({ error: `Cookies are invalid!` });
          } else {
            res.status(500).json({ error: 'Options not found!' });
          }
          loggerProgress(100);
          return;
        }

        const clientsPromise: Promise<WrapperApi.Read.Clients.Client>[] =
          values.map(async (option, index) => {
            const [id, title] = option
              .replace(/value="([\S\s]+?)??">([\S\s]+?)</g, '$1|$2')
              .split('|');

            const projects = await listProjects(+id);

            loggerProgress(+`50.${index}`);

            return { id: id || '-1', title, projects };
          });

        loggerProgress(60);

        const clients: WrapperApi.Read.Clients.Client[] = await Promise.all(
          clientsPromise
        );

        loggerProgress(70);

        res.status(200).json({ clients });

        loggerProgress(100);
      } catch (e) {
        loggerProgress(100);
        console.error('Error on list clients: ', e);
      }
    };

    loggerProgress(8);

    await listClients();
  };

  switch (req.method) {
    case 'POST':
      if (!req.body.cookies || req.body.cookies.length === 0) {
        loggerProgress(100);
        return res.status(401).json({ error: `Cookies not informed` });
      }
      loggerProgress(2);
      return post();
    default:
      loggerProgress(100);
      return res.status(405).json({ error: `Method don't found` });
  }
};

export default handler;
