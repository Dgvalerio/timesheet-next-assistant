import type { NextApiRequest, NextApiResponse } from 'next';

import { AxiosResponse } from 'axios';
import Protocol from 'devtools-protocol';

export type ApiHandler<Request = NextApiRequest, Response = NextApiResponse> = (
  req: Request,
  res: NextApiResponse<Response>
) => Promise<void>;

export namespace WrapperApi {
  export namespace SignIn {
    export interface Request {
      login: string;
      password: string;
    }

    export type Response =
      | {
          cookies: Protocol.Network.Cookie[];
          error?: never;
        }
      | {
          cookies?: never;
          error: string;
        };
  }

  export namespace Read {
    export namespace Appointments {
      export interface RequestBody {
        cookies: Protocol.Network.Cookie[];
      }

      export interface Request extends NextApiRequest {
        body: RequestBody;
        method: 'POST';
      }

      export interface Appointment {
        id: string;
        cliente: string;
        projeto: string;
        categoria: string;
        data: string;
        horaInicial: string;
        horaFinal: string;
        total: string;
        naoContabilizado: boolean;
        avaliacao: string;
      }

      export type Response =
        | {
            appointments: Appointment[];
            error?: never;
          }
        | {
            appointments?: never;
            error: string;
          };

      export type Handler = ApiHandler<Request, Response>;
    }

    export namespace Clients {
      export interface RequestBody {
        cookies: Protocol.Network.Cookie[];
      }

      export interface Request extends NextApiRequest {
        body: RequestBody;
        method: 'POST';
      }

      export interface Client {
        id: string;
        title: string;
        projects: Project[];
      }

      export interface Project {
        Id: number;
        Name: string;
        StartDate: string;
        EndDate: string;
        IdCustomer: number;
        categories: Category[];
        progress: ProjectProgress;
      }

      export interface Category {
        Id: number;
        Name: string;
        IdProject: number;
      }

      export interface ProjectProgress {
        Id: number;
        IdCell: null;
        CellName: null;
        IdCustomer: number;
        CustomerName: string;
        IdProject: number;
        ProjectName: string;
        IsMaintenance: boolean;
        HourLimitPerMonth: null;
        Budget: number;
        NotMonetize: boolean;
        StartDate: string;
        EndDate: string;
        TotalTime: string;
        TotalTimeMounth: string;
        TotalTimeInProject: string;
        ConsumedTimeInProject: string;
      }

      export type Response =
        | {
            clients: Client[];
            error?: never;
          }
        | {
            clients?: never;
            error: string;
          };

      export type Handler = ApiHandler<Request, Response>;
    }
  }
}

export interface API {
  wrapper: {
    account: {
      login: (
        data: WrapperApi.SignIn.Request
      ) => Promise<AxiosResponse<WrapperApi.SignIn.Response>>;
    };
    worksheet: {
      read: {
        appointments: (
          data: WrapperApi.Read.Appointments.RequestBody
        ) => Promise<AxiosResponse<WrapperApi.Read.Appointments.Response>>;
        clients: (
          data: WrapperApi.Read.Clients.RequestBody
        ) => Promise<AxiosResponse<WrapperApi.Read.Clients.Response>>;
      };
    };
  };
}
