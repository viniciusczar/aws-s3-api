const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand
} = require("@aws-sdk/client-s3");

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_REGION
};

const s3Client = new S3Client(s3Config);

async function uploadFile(req, res) {

  try {

    const name = req.files.file.name;
    const fileContent = req.files.file;
  
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: name,
      Body: fileContent.data,
      //ContentType: mimeType//geralmente se acha sozinho
    };
  
    const data = await s3Client.send(new PutObjectCommand(params));
    return res.send(data)

  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }

}

async function listObjects(req, res) {
  try{
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Prefix: '',
      Delimiter: '/'
    };
  
    const result = await s3Client.send(new ListObjectsCommand(params));
    return res.send(result.Contents.forEach((item) => {
      return res.send(item.Key);
    }))
  } catch(e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
}

async function getObject(req, res) {
  try {
    const objectKey = req.params.objectKey;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: objectKey
    }

    const data = await s3Client.send(new ListObjectsCommand(params));
    return res.send(data.Contents);
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
}

module.exports = { uploadFile, listObjects, getObject }