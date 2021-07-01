export function setMessageURL(eventType) {

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