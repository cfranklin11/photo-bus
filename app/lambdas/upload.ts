import "source-map-support/register.js"
import chromium from "@sparticuz/chrome-aws-lambda"

import type { Handler } from "aws-lambda"
import type { ElementHandle } from "puppeteer-core"

const { NODE_ENV, ACCOUNT_EMAIL, ACCOUNT_PASSWORD } = process.env
const UPLOADER_URL = "https://family-album.com/web/uploader"
const REQUIRED_ENV_VARS = [ACCOUNT_EMAIL, ACCOUNT_PASSWORD]
// TODO: Only sharing with admins while testing functionality.
// Change to family when we start using it for real.
const SHARE_GROUP = "ADMINS ONLY" // 'SHARE WITH FAMILY'

export const upload: Handler = async () => {
  if (!ACCOUNT_EMAIL || !ACCOUNT_PASSWORD) {
    const missingEnvVars = REQUIRED_ENV_VARS.filter((envVar) => !envVar)

    throw Error(
      `Missing values for the following required env vars: ${missingEnvVars.join(
        ", "
      )}`
    )
  }

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: NODE_ENV === "production",
    ignoreHTTPSErrors: true,
  })

  try {
    const page = await browser.newPage()
    await page.goto(UPLOADER_URL)
    await page.type("input[name=email]", ACCOUNT_EMAIL)
    await page.type("input[name=password]", ACCOUNT_PASSWORD)

    await page.clickAndWaitForNavigation("button[type=submit]")

    const input = await page.$("input[type=file]")
    await (input as ElementHandle<HTMLInputElement>).uploadFile(
      "./tests/fixtures/test.png"
    )

    const [button] = await page.$x(`//button[contains(., '${SHARE_GROUP}')]`)
    await (button as ElementHandle<HTMLButtonElement>).click()
  } finally {
    await browser.close()
  }

  return { statusCode: 200 }
}
