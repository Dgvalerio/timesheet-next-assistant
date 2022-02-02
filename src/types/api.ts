import { NextApiRequest, NextApiResponse } from 'next';

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
    export interface Request {
      cookies: Protocol.Network.Cookie[];
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
      read: (
        data: WrapperApi.Read.Request
      ) => Promise<AxiosResponse<WrapperApi.Read.Response>>;
    };
  };
}
