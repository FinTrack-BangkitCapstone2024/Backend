const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');

dotenv.config();

const storage = new Storage({
  keyFilename: process.env.SERVICE_ACCOUNT,
  projectId: process.env.PROJECT_ID,
});

const bucketName = 'fintrack-424802.appspot.com';
const bucket = storage.bucket(bucketName);

module.exports = bucket;
