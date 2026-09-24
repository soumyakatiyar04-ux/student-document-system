const {CloudWatchClient, PutMetricDataCommand} = require('@aws-sdk/client-cloudwatch');
const putCloudwatchLog = require('../utils/logger');

const cloudWatch = new CloudWatchClient({
    region : process.env.AWS_REGION
})

const uploadMetric = async (metricName) => {
   const command = new PutMetricDataCommand({
       Namespace: "myapplication",
       MetricData: [{
         MetricName: metricName,
         Dimensions: [{
            Name: "Enviornment",
            Value: "local"
         }],
          Value: 1,
             Unit: "Count",
             Timestamp: new Date()
       }]
   })
   await cloudWatch.send(command);
   console.log(`cloud Metric sent: ${metricName}`)
}

module.exports = uploadMetric;