export const getFormattedSessionCookies = (cookies: SessionCookies) => {
    let result = "";
    for (const key in cookies) {
        result += `${key}=${cookies[key]};`
    }
    return result;
}

export interface SessionCookies {
    [key: string]: string | Date,
    "ASP.NET_SessionId": string,
    "BaseSchoolUrl": string, // idk what this means but normal value for 577 is 16287
    "isloggedin3": string, // idk what this means but normal value is Y 
    "LastAuthenticatedPageLoad": Date, // converted to string when sent
    "LastLoginExamno": string, // SCHOOL_ID
    "LastLoginUserName": string, // USER_NAME
    "lectiogsc": string,
}
