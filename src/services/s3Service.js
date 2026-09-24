const { PutObjectCommand } = require("@aws-sdk/client-s3");

const connection = require("../config/db");
const s3 = require("../config/s3config");
const uploadNotification = require("./snsServices");

const uploadDocument = async (profile, user_id) => {
    const s3_key =
        `${user_id}/profile/${profile.fieldname}_${profile.originalname}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: profile.buffer,
            Key: s3_key,
            ContentType: profile.mimetype
        })
    );
    console.log("File uploaded to S3")

    const baseObjectUrl =
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
    const s3_url =`${baseObjectUrl}${s3_key}`;

    await uploadNotification(s3_key,profile.originalname);
    console.log("SNS notification sent");

    return {s3_key: s3_key,s3_url: s3_url};
};

module.exports = {uploadDocument};