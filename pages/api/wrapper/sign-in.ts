import type { NextApiRequest } from 'next';

import { ApiHandler } from '@/types/api';
import { wrapper } from '@/utils/wrapper';

import Protocol from 'devtools-protocol';
import puppeteer from 'puppeteer/lib/cjs/puppeteer/node-puppeteer-core';

export namespace WrapperSignIn {
  export interface Request {
    login: string;
    password: string;
  }

  export interface Response {
    cookies: Protocol.Network.Cookie[];
  }
}

interface Request extends NextApiRequest {
  body: WrapperSignIn.Request;
}

const handler: ApiHandler<Request, WrapperSignIn.Response> = async (
  req,
  res
) => {
  const baseUrl = wrapper.baseURL;

  const post = async () => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(baseUrl + '/Account/Login');

      await page.waitForSelector('form');

      await page.type('#Login', req.body.login);
      await page.type('#Password', req.body.password);

      await page.click('[type="submit"]');

      await page.waitForNavigation();

      await page.goto(baseUrl + '/Worksheet/Read');

      const cookies = await page.cookies();

      await page.close();

      res.status(200).json({ cookies });
    } catch (e) {
      res.status(500);
    }
  };

  switch (req.method) {
    case 'POST':
      return post();
    default:
      return;
  }
};

export default handler;
