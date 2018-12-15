const AWS = require('aws-sdk');
const SES = new AWS.SES({
    region: process.env.AWS_REGION
});

const Source = process.env.EMAIL_SOURCE;
const To = process.env.EMAIL_DESTINATION;

function genEmail({ subject = '', from, message }) {
    return {
        Destination: {
            ToAddresses: [ To ]
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
                Data: subject
            }
        },
        ReplyToAddresses: [ from ] ,
        Source
    };
}

exports.handler = (event, context, callback) => {
    const email = genEmail(event);

    SES.sendEmail(email)
        .promise()
        .then(data => {
            callback(null, data)
        })
        .catch(error => {
            callback(error)
        });
};
