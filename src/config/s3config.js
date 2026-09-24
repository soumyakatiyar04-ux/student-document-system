const {S3Client, putObjectCommand} =require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region : process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY
    }
})

module.exports = s3