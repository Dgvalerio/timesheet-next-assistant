import { WrapperApi } from '@/types/api';
import { getOptions } from '@/utils/chromeOptions';
import { wrapper } from '@/utils/wrapper';

import puppeteer, { Protocol, PuppeteerErrors } from 'puppeteer-core';

const handler: WrapperApi.Create.Appointment.Handler = async (req, res) => {
  let requestProgress = 0;

  const loggerProgress = (progressPercentage: number) => {
    requestProgress = progressPercentage;
    console.log(`${requestProgress}% on ${req.url}`);
  };

  loggerProgress(0);

  const post = async () => {
    const cookies: Protocol.Network.CookieParam[] = req.body.cookies.map(
      ({ name, value }) => ({ name, value })
    );

    loggerProgress(4);
    const browser = await puppeteer.launch(await getOptions());
    loggerProgress(6);
    const [page] = await browser.pages();

    try {
      loggerProgress(8);
      await page.goto(wrapper.worksheetRead);
      loggerProgress(10);
      const loadCookies = cookies.map(async (cookie, index) => {
        loggerProgress(+`20.${index}`);
        return await page.setCookie(cookie);
      });
      loggerProgress(12);
      await Promise.all(loadCookies);
      loggerProgress(14);
      await page.goto(wrapper.worksheetRead);
      loggerProgress(16);
      await page.waitForSelector('#tbWorksheet');
      loggerProgress(20);

      await page.select('#IdCustomer', req.body.customer);
      loggerProgress(20.5);
      await page.waitForResponse((response) =>
        response.url().includes('/Worksheet/ReadProject')
      );
      loggerProgress(21);

      await page.select('#IdProject', req.body.project);
      loggerProgress(21.4);
      await page.waitForResponse((response) =>
        response.url().includes('/Worksheet/ReadCategory')
      );
      loggerProgress(21.8);
      await page.waitForResponse((response) =>
        response.url().includes('/Worksheet/ReadProjectProgress')
      );
      loggerProgress(22);

      await page.select('#IdCategory', req.body.category);
      loggerProgress(23);

      await page.waitForSelector('#StartTime', {
        visible: true,
        timeout: 3000,
      });
      await page.click('#StartTime');
      await page.keyboard.type(req.body.startTime);
      loggerProgress(24);

      await page.waitForSelector('#EndTime', { visible: true, timeout: 3000 });
      await page.click('#EndTime');
      await page.keyboard.type(req.body.endTime);
      loggerProgress(25);

      await page.waitForSelector('#Description', {
        visible: true,
        timeout: 3000,
      });
      await page.click('#Description');
      await page.keyboard.type(req.body.description);
      loggerProgress(26);

      await page.waitForSelector('#InformedDate', {
        visible: true,
        timeout: 3000,
      });
      await page.click('#InformedDate');
      await page.keyboard.type(req.body.informedDate);
      loggerProgress(27);

      if (req.body.notMonetize) {
        await page.click('#NotMonetize');
        loggerProgress(28);
      }

      await page.click('[type="submit"]');
      loggerProgress(50);
      await page.waitForSelector('.alert.alert-warning', { timeout: 3000 });
      loggerProgress(60);
      await page.close();
      loggerProgress(80);
      res.status(200).json({ data: 'Success!' });
    } catch (e) {
      console.error({ e });

      if (
        (<Error>e).message ===
        'waiting for selector `.alert.alert-warning` failed: timeout 3000ms exceeded'
      ) {
        try {
          await page.waitForSelector('.alert.alert-danger');
          const response = await page.evaluate(
            () => document.querySelector('.alert.alert-danger')?.textContent
          );

          res.status(500).json({
            error: response
              ? response.replace(/\n[\s]+/gm, '')
              : `There was a create appointments failure: ${
                  (<PuppeteerErrors>e).message
                }`,
          });
          loggerProgress(90);
        } catch (e2) {
          res.status(500).json({
            error: `There was a create appointments failure: ${
              (<PuppeteerErrors>e2).message
            }`,
          });
          loggerProgress(90);
        }
      } else {
        res.status(500).json({
          error: `There was a create appointments failure: ${
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
      loggerProgress(2);
      return post();
    default:
      loggerProgress(100);
      return res.status(405).json({ error: `Method don't found` });
  }
};

export default handler;
