const AWS = require('aws-sdk');
const SES = new AWS.SES({
    region: process.env.AWS_REGION
});

exports.handler = async ({ subject, from, message }) => {
    const email = {
        Destination: {
            ToAddresses: [ process.env.EMAIL_DESTINATION ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: message
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject || ""
            }
        },
        ReplyToAddresses: [ from ] ,
        Source: process.env.EMAIL_SOURCE
    };
    try {
        const response = await SES
            .sendEmail()
            .promise();

        return response;
    } catch (error) {
        throw new Error('Body must start with "Hello "');
    }
};
