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
      console.time('timer');
      console.log('5%');
      const browser = await puppeteer.launch(await getOptions());
      const [page] = await browser.pages();
      await page.goto(wrapper.accountLogin);
      console.log('15%');
      await page.waitForSelector('form');
      console.log('20%');
      await page.type('#Login', req.body.login);
      await page.type('#Password', req.body.password);
      console.log('25%');
      await page.click('[type="submit"]');
      console.log('30%');
      console.log('40%');
      if (page.url() !== wrapper.homeIndex)
        return res.status(406).json({ error: 'Invalid login' });
      console.log('50%');
      console.timeLog('timer');
      await page.goto(wrapper.worksheetRead);
      console.log('60%');
      console.timeLog('timer');
      const cookies = await page.cookies();
      console.log('70%');
      await page.close();
      console.log('80%');
      res.status(200).json({ cookies });
      console.log('100%');
      console.timeEnd('timer');
    } catch (e) {
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
      return res.status(405).json({ error: `Method don't found` });
  }
};

export default handler;
