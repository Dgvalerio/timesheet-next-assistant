import type { NextApiRequest } from 'next';

import { ApiHandler, WrapperApi } from '@/types/api';
import { getOptions } from '@/utils/chromeOptions';
import { wrapper } from '@/utils/wrapper';

import puppeteer from 'puppeteer-core';

interface Request extends NextApiRequest {
  body: WrapperApi.SignIn.Request;
}

const handler: ApiHandler<Request, WrapperApi.SignIn.Response> = async (
  req,
  res
) => {
  console.log('0%');

  const post = async () => {
    try {
      console.log('4%');
      const browser = await puppeteer.launch(await getOptions());
      console.log('6%');
      const [page] = await browser.pages();
      console.log('8%');
      await page.goto(wrapper.accountLogin);
      console.log('10%');
      await page.waitForSelector('form');
      console.log('20%');
      await page.type('#Login', req.body.login);
      console.log('30%');
      await page.type('#Password', req.body.password);
      console.log('40%');
      await page.click('[type="submit"]');
      console.log('50%');
      await page.waitForSelector('.sidebar-menu');
      console.log('60%');
      if (page.url() !== wrapper.homeIndex) {
        console.log("100% { error: 'Invalid login' }");
        return res.status(406).json({ error: 'Invalid login' });
      }
      console.log('70%');
      const cookies = await page.cookies();
      console.log('80%');
      await page.close();
      console.log('90%');
      res.status(200).json({ cookies });
      console.log('100%');
    } catch (e) {
      console.log('100% { error: `There was a login failure` }');
      console.error({ e });
      res
        .status(500)
        .json({ error: `There was a login failure: ${JSON.stringify(e)}` });
    }
  };

  switch (req.method) {
    case 'POST':
      console.log('2%');
      return post();
    default:
      console.log("100% { error: `Method don't found` }");
      return res.status(405).json({ error: `Method don't found` });
  }
};

export default handler;
