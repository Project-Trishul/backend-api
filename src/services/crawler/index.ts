import puppeteer from "puppeteer";
import { Express, Request, Response } from "express";

// Define your function
export async function crawlAndSaveData(params:any ) {

  let url = params.query.url;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log("URL: ", url);

  await page.goto(url, { waitUntil: 'load' });

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Scrape all text from the page
  const allText = await page.evaluate(() => {
    return document.body.innerText;
  });

  console.log(allText)

  // Print all scraped text

  await browser.close();
  return allText;

}

export const WebCrawlerService = {
  crawlAndSaveData
}
