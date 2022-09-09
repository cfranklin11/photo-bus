import "source-map-support/register.js"

import * as puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chrome-aws-lambda"

import type { Handler } from "aws-lambda"

const { NODE_ENV, ACCOUNT_EMAIL, ACCOUNT_PASSWORD } = process.env
const UPLOADER_URL = "https://family-album.com/web/uploader"
const REQUIRED_ENV_VARS = [ACCOUNT_EMAIL, ACCOUNT_PASSWORD]

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
  if (!ACCOUNT_EMAIL || !ACCOUNT_PASSWORD) {
    const missingEnvVars = REQUIRED_ENV_VARS.filter((envVar) => !envVar)

    throw Error(
      `Missing values for the following required env vars: ${missingEnvVars.join(
        ", "
      )}`
    )
  }

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await page.goto(UPLOADER_URL)
    await page.type("input[name=email]", ACCOUNT_EMAIL)
    await page.type("input[name=password]", ACCOUNT_PASSWORD)

    await page.clickAndWaitForNavigation("button[type=submit]")
    const content = await page.content()
    console.log(content)
  } finally {
    await browser.close()
  }

  return { statusCode: 200 }
}
