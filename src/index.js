const AWS = require('aws-sdk');

const SES = new AWS.SES({ region: process.env.AWS_REGION });
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

exports.handler = async (event, context, callback) => {
    const  { stageVariables } = event;
    const requestBody = JSON.parse(event.body);

    let error = null;
    let response = null;

    try {
        if (stageVariables.stage === 'prod') {
            await SES.sendEmail(genEmail(requestBody))
                .promise();
        }

        response = {
            statusCode: 200,
            headers: {
                "Content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ success: true })
        }
    } catch (error) {
        callback({
            errorType: "InternalServerError",
            errorMessage: "Internal sever error"
        });
    }
    finally {
        callback(error, response);
    }
};
