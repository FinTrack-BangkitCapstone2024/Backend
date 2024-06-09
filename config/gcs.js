const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: '<locakasi file>',
  projectId: 'fintrack-424802'
});

const bucketName = 'fintrack-424802.appspot.com';
const bucket = storage.bucket(bucketName);

module.exports = bucket;