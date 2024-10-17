import mongoose, { Schema } from 'mongoose';

const L1WebsiteDataSchema = new Schema({
    domain: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    reportURL: {
        type: String,
    },
    dwpRating: {
        type: String,
    },
    dwpDetected: {
        type: Array<String>,
    },
    dwpInformation: {
       type: Map<String,Number>
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    dwpImages: {
        type: String,
    },
    version: {
        type: String,
    },
});

const L1WebsiteDataModel = mongoose.model('L1WebsiteData', L1WebsiteDataSchema);

export const DBModels = {
    L1WebsiteDataModel
}

    

    

