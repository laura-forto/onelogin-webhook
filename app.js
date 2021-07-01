
const axios = require('axios').default
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body)

        const eventTypes = [13, 14, 15, 32]

        const events = Array.from(body).filter(event => eventTypes.includes(event.event_type_id))

        for (const event of events) {
            try {
                const jiraURL = setMessageURL(event.event_type_id)
                console.log(jiraURL)
                const resp = await axios.post(jiraURL, event)
                console.log(resp)
            } catch (err) {
                console.log(err);
                return err;
            }
        }
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify(events)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

function setMessageURL(eventType) {

    switch (eventType) {
        case 13:
            return getJiraAutomationURL('329aeeeae585b244e542ddc964af21f5e49879c1')
        case 14:
            return getJiraAutomationURL('dc28e3c6df175e38a5079c416ea25c7a43b150db');
        case 15:
            return getJiraAutomationURL('f466649fc4ee8cccee48de3c0186a148168238b8');
        case 32:
            return getJiraAutomationURL('206272c1bf802351ab2e6eff50d81a99b21e67c9');
    }
}

function getJiraAutomationURL(hookID) {
    const jiraAutomationURL = 'https://automation.atlassian.com/pro/hooks'
    return `${jiraAutomationURL}/${hookID}`
}