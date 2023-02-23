const express = require ('express')
const routes = express.Router();
const s3Client = require ('./services/s3Client')

routes.use('/index', express.static('route static'));

routes.get('/health', (req, res) => {
  res.send('Successful response.');
});

routes.get('/listObjects', s3Client.listObjects)
routes.get('/getObjects/:objectKey', s3Client.getObject)

routes.post('/putObjects', s3Client.uploadFile);

module.exports = routes;