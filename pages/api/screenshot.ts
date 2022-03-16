import { NextApiRequest, NextApiResponse } from 'next';
import core from 'puppeteer-core';
import absoluteUrl from 'next-absolute-url';
import { getOptions } from './_lib/options';

const isDev = !process.env.AWS_REGION;
let _browser: core.Browser | null;

const screenshot = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { origin } = absoluteUrl(req);
    const file = await getScreenshot(`${origin}${req.url?.replace('/api/screenshot', '/')}`, isDev);
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/png`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(file);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

async function getBrowser(isDev: boolean) {
  if (_browser) {
    return _browser;
  }
  const options = await getOptions(isDev);
  _browser = await core.launch(options);
  return _browser;
}

async function getScreenshot(url: string, isDev: boolean) {
  const browser = await getBrowser(isDev);
  const page = await browser.newPage();
  await page.setViewport({ deviceScaleFactor: 2, width: 1920, height: 1080 });
  await page.goto(url);
  await page.waitForSelector('.completed');
  const el = await page.$('.chakra-linkbox');
  const file = await el?.screenshot();
  await page.close();
  return file;
}

export default screenshot;
