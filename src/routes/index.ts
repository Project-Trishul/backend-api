import express, { Request, Response } from 'express';
import { generatePdf } from '../services/report_generation/reportGeneration';
import { crawlAndSaveData } from '../services/crawler'; // Import the missing function
import { getPatternsFromB64 } from '../services/gemini';
import { getPatternsFromImage } from '../services/gemini';
import multer from 'multer';
const upload = multer({dest: 'uploads/'})

import {BulkReportService} from '../services/bulkreport/index'


const router = express.Router();

// router.route('/').post();

router.route('/crawler').get(crawlAndSaveData);
// router.route('/report').get(generatePdf);
router.route('/geminib64').post(getPatternsFromB64);
router.route('/geminiurl').post(getPatternsFromImage);
router.route('/generatePDF').get(generatePdf);
router.route('/bulkreportgenerate').post(upload.single('csvFile'), BulkReportService.bulkReportGenerate);

//log all routes that were created
router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
        console.log(r.route.path)
    }
})
export default router;