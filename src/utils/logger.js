const {
  CloudWatchLogsClient,
  PutLogEventsCommand,
} = require("@aws-sdk/client-cloudwatch-logs");

const cloudwatchLog = new CloudWatchLogsClient({
  region: process.env.AWS_REGION,
});

const putCloudwatchLog = (level, message) => {
  const logmessage = `${level}: ${message}`;
  console.log(logmessage);

  try {
    cloudwatchLog.send(
      new PutLogEventsCommand({
        logGroupName: process.env.AWS_CLOUDWATCH_LOG_GROUP,
        logStreamName: process.env.AWS_CLOUDWATCH_LOG_STREAM,

        logEvents: [
          {
            timestamp: Date.now(),
            message: logmessage,
          },
        ],
      }),
    );
  } catch (err) {
    console.log("cloudWatch logging Failed", err.message);
  }
};

module.exports = putCloudwatchLog;
