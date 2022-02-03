import { PuppeteerLaunchOptions } from '@/types/puppeteer';

import chrome from 'chrome-aws-lambda';

const chromeExecPaths = {
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};

const executablePath: string =
  chromeExecPaths[process.platform as 'win32' | 'linux' | 'darwin'];

export const getOptions = async (): Promise<PuppeteerLaunchOptions> =>
  process.env.NODE_ENV === 'development'
    ? {
        executablePath,
        headless: false,
      }
    : {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      };
