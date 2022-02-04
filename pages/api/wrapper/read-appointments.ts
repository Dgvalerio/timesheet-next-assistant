import { WrapperApi } from '@/types/api';
import { getOptions } from '@/utils/chromeOptions';
import { wrapper } from '@/utils/wrapper';

import puppeteer, { Protocol } from 'puppeteer-core';

const handler: WrapperApi.Read.Appointments.Handler = async (req, res) => {
  console.log('0%');

  const post = async () => {
    const cookies: Protocol.Network.CookieParam[] = req.body.cookies.map(
      ({ name, value }) => ({
        name,
        value,
      })
    );

    try {
      console.log('5%');
      const browser = await puppeteer.launch(await getOptions());
      const [page] = await browser.pages();
      console.log('10%');
      await page.goto(wrapper.worksheetRead);
      console.log('20%');
      const loadCookies = cookies.map(async (cookie, index) => {
        console.log(`20.${index}%`);
        return await page.setCookie(cookie);
      });
      console.log('30%');
      await Promise.all(loadCookies);
      console.log('40%');
      await page.goto(wrapper.worksheetRead);
      console.log('50%');
      await page.waitForSelector('#tbWorksheet');
      console.log('60%');
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
      console.log('70%');
      await page.close();
      console.log('80%');
      res.status(200).json({ appointments });
      console.log('100%');
    } catch (e) {
      console.error({ e });
      res.status(500).json({
        error: `There was a list appointments failure: ${JSON.stringify(e)}`,
      });
    }
  };

  switch (req.method) {
    case 'POST':
      if (!req.body.cookies || req.body.cookies.length === 0) {
        console.log('100%');
        return res.status(401).json({ error: `Cookies not informed` });
      }
      console.log('2%');
      return post();
    default:
      console.log('100%');
      return res.status(405).json({ error: `Method don't found` });
  }
};

export default handler;
