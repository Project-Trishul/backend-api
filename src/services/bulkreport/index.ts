import express, { Request, Response } from 'express';
import { parse } from 'csv-parse';
import {  WebCrawlerService } from '../crawler/index';
import fs from 'fs';

async function bulkReportGenerate(req: Request, res: Response) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const extractedUrls: string[] = [];

    // Read the CSV file
    fs.createReadStream(req.file.path)
        .pipe(parse())
        .on('data', (row: string[]) => {
            // Assuming each row contains comma-separated values
            if (row.length >= 3) {
                // Extract the third value, which represents the URL
                extractedUrls.push(row[2]);
            }
        })
        .on('end', async () => {
            // Delete the uploaded file after processing
            fs.unlinkSync(req.file.path);

            // Call the crawler service for each extracted URL with a delay of 1 second
            for (let i = 0; i < extractedUrls.length; i++) {
                try {
                    // Await the result of crawling and saving data for each URL
                    await delay(3000)
                    await WebCrawlerService.crawlAndSaveData({ query: { url: extractedUrls[i] } });
                } catch (error) {
                    console.error(`Error crawling and saving data for ${extractedUrls[i]}:`, error);
                }
            }

            // Respond with the extracted URLs
            res.json({ extractedUrls });
        })
        .on('error', (err: Error) => {
            console.error('Error occurred while processing CSV:', err);
            res.status(500).send('Error occurred while processing CSV.');
        });
}

// Utility function to create a delay
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const BulkReportService = {
    bulkReportGenerate
}
