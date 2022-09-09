import "source-map-support/register"

import * as puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chrome-aws-lambda"

import type { Handler } from "aws-lambda"

const { NODE_ENV } = process.env
const UPLOADER_URL = "https://family-album.com/web/uploader"

const launchBrowser = async () => {
  if (NODE_ENV === "production")
    return await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    })

  return await puppeteer.launch()
}

export const upload: Handler = async () => {
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await page.goto(UPLOADER_URL)
    const content = await page.content()
    console.log(content)
  } finally {
    await browser.close()
  }

  return { statusCode: 200 }
}
