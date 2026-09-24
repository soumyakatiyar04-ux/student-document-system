const {
    SNSClient,
    PublishCommand
} = require("@aws-sdk/client-sns");

const sns = new SNSClient({
    region: process.env.AWS_REGION
});


const uploadNotification = async (s3_key, originalname) => {

    const message = {
        event: "DOCUMENT_UPLOADED",
        fileName: originalname,
        s3Key: s3_key,
        uploadedAt: new Date().toISOString()
    };


    const command = new PublishCommand({
        TopicArn: process.env.AWS_SNS_TOPIC_ARN,
        Subject: "Document uploaded",
        Message: JSON.stringify(message)
    });


    const result = await sns.send(command);

    return result;
};


module.exports = uploadNotification;