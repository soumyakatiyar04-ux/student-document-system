const { PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = require("../config/s3config");
const uploadNotification = require("./snsServices");
const putCloudwatchLog = require("../utils/logger");
const uploadMetric = require("./cloudWacthService");


const uploadDocument = async (profile, user_id) => {

    const s3_key =
        `${user_id}/profile/${profile.fieldname}_${profile.originalname}`;
    await putCloudwatchLog(
        "INFO",
        `Upload started - userId=${user_id}, fileName=${profile.originalname}`
    );
    try {
        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Body: profile.buffer,
                Key: s3_key,
                ContentType: profile.mimetype
            })
        );
        
        await uploadMetric("DocumentsUploaded")

        console.log("File uploaded to S3");

        await putCloudwatchLog(
            "INFO",
            "S3 upload successful"
        );

        const baseObjectUrl =
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;

        const s3_url = `${baseObjectUrl}${s3_key}`;

        await uploadNotification(
            s3_key,
            profile.originalname
        );
        await uploadMetric("SNSNotificationsSent");

        console.log("SNS notification sent");

        return {
            s3_key,
            s3_url
        };

    } catch (err) {

        await putCloudwatchLog(
            "ERROR",
            "S3 upload failed"
        );

        await uploadMetric("DocumentsUploadFailed");
        throw err;
    }
};

module.exports = {
    uploadDocument
};