import type { NextApiRequest } from 'next';

import { ApiHandler, WrapperApi } from '@/types/api';
import { wrapper } from '@/utils/wrapper';

import puppeteer from 'puppeteer/lib/cjs/puppeteer/node-puppeteer-core';

interface Request extends NextApiRequest {
  body: WrapperApi.SignIn.Request;
}

const handler: ApiHandler<Request, WrapperApi.SignIn.Response> = async (
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
