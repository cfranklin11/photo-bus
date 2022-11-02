import "source-map-support/register.js"
import chromium from "@sparticuz/chrome-aws-lambda"

import type { Handler } from "aws-lambda"

const UPLOADER_URL = "https://family-album.com/web/uploader"

export const test: Handler = async (): Promise<{
  statusCode: number
}> => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

  try {
    const page = await browser.newPage()
    await page.goto(UPLOADER_URL)
  } finally {
    await browser.close()
  }

  return { statusCode: 200 }
}
