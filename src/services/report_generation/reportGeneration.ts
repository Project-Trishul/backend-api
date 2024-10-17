//use puppeteer to generate pdf from html 
import puppeteer from "puppeteer";
import { Express, Request, Response } from "express";
import { join } from 'path';
import { Configuration } from "puppeteer";
import { stringify } from "querystring";
const config: Configuration = require('./config');
const handlebars = require('handlebars');
const fs = require("fs");
const path = require("path");



//generate pdf from html that is sitting locally while you also write html manually 
export async function generatePdf(req: Request, res: Response) {

  // const data = {
  //   title: "A new Brazilian School",
  //   date: "05/12/2018",
  //   name: "Rodolfo Luis Marcos",
  //   age: 28,
  //   birthdate: "12/07/1990",
  //   course: "Computer Science",
  //   obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
  // }

  const data = require('./templates/test_1.json')

  //comment out entire handle bar code it throws eerros 
  //import handlebars template file 
  var templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/services/report_generation/templates/report-template.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
	var html = template(data);


  console.log(html);

  //now put json into the template




  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();

  await page.setContent(html);
  await page.pdf({ path: './public/mypdf.pdf', format: 'A4' });
  await browser.close();
  res.status(200).send("PDF generated successfully");
}