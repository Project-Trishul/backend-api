import { DBModels } from '../models/models';

async function createL1WebsiteReport(params: any) {
    try {
        const report = await DBModels.L1WebsiteDataModel.create(params);
        return report;
    } catch (error) {
        console.log(error);
    }
}


async function getL1WebsiteReport(domain: string) {
    try {
        const report = await DBModels.L1WebsiteDataModel.findOne({ domain
        });
        return report;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateL1WebsiteReport(domain: string, params: any) {
    try {
        const report = await DBModels.L1WebsiteDataModel.findOneAndUpdate({ domain },
            params, { new: true });
        return report;
    }
    catch (error) {
        console.log(error);
    }
}

export const DML = {
    createL1WebsiteReport,
    getL1WebsiteReport,
    updateL1WebsiteReport
}
