import { NextApiRequest, NextApiResponse } from 'next';

export type ApiHandler<Request = NextApiRequest, Response = NextApiResponse> = (
  req: Request,
  res: NextApiResponse<Response>
) => Promise<void>;
