const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();

AWS.config.updat({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1"
  });
const s3 = new AWS.S3();
module.exports = s3;

