import { WrapperApi } from '@/types/api';
import { getOptions } from '@/utils/chromeOptions';
import { wrapper } from '@/utils/wrapper';

import puppeteer, { Protocol, PuppeteerErrors } from 'puppeteer-core';

const handler: WrapperApi.Read.Appointments.Handler = async (req, res) => {
  let requestProgress = 0;

  const loggerProgress = (progressPercentage: number) => {
    requestProgress = progressPercentage;
    console.log(`${requestProgress}% on ${req.url}`);
  };

  loggerProgress(0);

  const post = async () => {
    const cookies: Protocol.Network.CookieParam[] = req.body.cookies.map(
      ({ name, value }) => ({
        name,
        value,
      })
    );

    loggerProgress(5);
    const browser = await puppeteer.launch(await getOptions());
    const [page] = await browser.pages();

    try {
      loggerProgress(10);
      await page.goto(wrapper.worksheetRead);
      loggerProgress(20);
      const loadCookies = cookies.map(async (cookie, index) => {
        loggerProgress(+`20.${index}`);
        return await page.setCookie(cookie);
      });
      loggerProgress(30);
      await Promise.all(loadCookies);
      loggerProgress(40);
      await page.goto(wrapper.worksheetRead);
      loggerProgress(50);
      await page.waitForSelector('#tbWorksheet');
      loggerProgress(60);
      const appointments = await page.evaluate(() => {
        const items: WrapperApi.Read.Appointments.Appointment[] = [];

        document
          .querySelectorAll('#tbWorksheet > tbody > tr')
          .forEach(({ children }) =>
            items.push({
              id: (children[9] as HTMLTableColElement)?.children[0].id,
              cliente: (children[0] as HTMLTableColElement)?.innerText,
              projeto: (children[1] as HTMLTableColElement)?.innerText,
              categoria: (children[2] as HTMLTableColElement)?.innerText,
              data: (children[3] as HTMLTableColElement)?.innerText,
              horaInicial: (children[4] as HTMLTableColElement)?.innerText,
              horaFinal: (children[5] as HTMLTableColElement)?.innerText,
              total: (children[6] as HTMLTableColElement)?.innerText,
              naoContabilizado: (
                (children[7] as HTMLTableColElement)
                  ?.children[0] as HTMLInputElement
              ).checked,
              avaliacao: (children[8] as HTMLTableColElement)?.innerText,
            })
          );

        return items;
      });
      loggerProgress(70);
      res.status(200).json({ appointments });
      loggerProgress(80);
    } catch (e) {
      console.error({ e });

      if (
        (<Error>e).message ===
        'waiting for selector `#tbWorksheet` failed: timeout 30000ms exceeded'
      ) {
        try {
          await page.waitForSelector('.login-container');
          res.status(401).json({ error: `Cookies are invalid!` });
          loggerProgress(90);
        } catch (e2) {
          res.status(500).json({
            error: `There was a list appointments failure: ${
              (<PuppeteerErrors>e2).message
            }`,
          });
          loggerProgress(90);
        }
      } else {
        res.status(500).json({
          error: `There was a list appointments failure: ${
            (<PuppeteerErrors>e).message
          }`,
        });
        loggerProgress(90);
      }
    } finally {
      await page.close();
      loggerProgress(100);
    }
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
