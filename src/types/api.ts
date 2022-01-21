import { NextApiRequest, NextApiResponse } from 'next';

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
}
