import puppeteer from "puppeteer"
import chromium from "@sparticuz/chrome-aws-lambda"

const UPLOADER_URL = "https://family-album.com/web/uploader"

export const upload = async () => {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
  })

  try {
    const page = await browser.newPage()
    await page.goto(UPLOADER_URL)
    const content = await page.content()
    console.log(content)
  } finally {
    await browser.close()
  }
}
