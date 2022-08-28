import puppeteer from "puppeteer"

const UPLOADER_URL = "https://family-album.com/web/uploader"

export const upload = async () => {
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()
    await page.goto(UPLOADER_URL)
    const content = await page.content()
    console.log(content)
  } finally {
    await browser.close()
  }
}
