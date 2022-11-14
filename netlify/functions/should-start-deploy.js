import fetch from "node-fetch"
import moment from "moment";

const api_key = process.env.GOOGLE_CAL_API_KEY;
const cal_id = process.env.GOOGLE_CAL_ID;
const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${cal_id}/events`);
url.searchParams.append("key", api_key);
url.searchParams.append("maxResults", "100");
const yesterday = moment().subtract(1, "d");
url.searchParams.append("timeMin", yesterday.toISOString());
url.searchParams.append("singleEvents", "true");
url.searchParams.append("orderBy", "startTime");
url.searchParams.append("showDeleted", "true");


export const shouldDeploy = async () => {
    let shouldDeploy = false;
    const events = await fetch(url.href);
    const data = await events.json();
    data.items.every(item => {
        if (moment(item.start.dateTime).isSame(yesterday, "d") ||
            moment(item.created.dateTime).isSame(yesterday, "d") ||
            moment(item.updated.dateTime).isSame(yesterday, "d")) {
                shouldDeploy = true
        }
        return true
    });
    return shouldDeploy
}

export const handler = async () => {
    return shouldDeploy().then(shouldDeployToday => {
        return {
            statusCode: 200,
            body: JSON.stringify({ shouldDeployToday })
        }
    })
}