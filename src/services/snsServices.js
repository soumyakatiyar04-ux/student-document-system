const {SNSClient,PublishCommand} = require('@aws-sdk/client-sns');

const sns = new SNSClient({
    region:process.env.AWS_REGION
})

const uploadNotification = async (profileKey, originalname) => {

    const message = {
        event: "DOCUMENT_UPLOADED",
        fileName: originalname,
        s3Key: profileKey,
        uploadedAt: new Date().toISOString()
    };

    const command = new PublishCommand({
        TopicArn: process.env.AWS_SNS_TOPIC_ARN,
        Subject: "Document uploaded",
        Message: JSON.stringify(message)
    });

    return await sns.send(command);
};

module.exports = uploadNotification;