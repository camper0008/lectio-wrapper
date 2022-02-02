import fetch, { Headers } from "node-fetch";
import { SessionCookies } from "./cookies.js";
import { DOMParser } from "@xmldom/xmldom";
const loginRequestBody = (validation: string) => {
    const { USERNAME, PASSWORD } = process.env;
    return `time=0&__EVENTTARGET=m%24Content%24submitbtn2&__EVENTARGUMENT=&__LASTFOCUS=&__SCROLLPOSITION=&__VIEWSTATEX=oAAAAGlpZQotNDQ2NjMxODMxaWwCawCBbAJoaWRsAmcCaWwCawFlA29mZmwCZwNpZGwCZwVpZGwCgWlkbAJnCWlkbASBaWwCawJlCU1lcmNhbnRlY2RnB2lkbAKBaWRsAoFpamlsAmsDcGRkZGRyAWUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fbAFlDG0kQ2hvb3NlVGVybQQAAAATVmFsaWRhdGVSZXF1ZXN0TW9kZQxhdXRvY29tcGxldGUJaW5uZXJodG1sB0NoZWNrZWQAfAMQd2K6j7U6ZnhEKY%2FchTQuoEA%3D&__VIEWSTATEY_KEY=&__VIEWSTATE=&__EVENTVALIDATION=${validation}&m%24Content%24username=${USERNAME}&m%24Content%24password=${PASSWORD}&masterfootervalue=X1%21%C3%86%C3%98%C3%85&LectioPostbackId=`
}

const loginRequestLink = () => {
    const { SCHOOL_ID } = process.env;
    return `https://www.lectio.dk/lectio/${SCHOOL_ID}/login.aspx`
}

const extractCookiesFromHeader = (requestHeader: Headers): string[] => {
    const header = requestHeader.raw()['set-cookie'];
    return header;
}

const setCookiesHeaderToInterface = (cookiesArray: string[]): SessionCookies => {
    const { USERNAME, SCHOOL_ID } = process.env;

    const cookies: SessionCookies = {
        "BaseSchoolUrl": "16287", // idk
        "isloggedin3": "Y", // idk
        "LastAuthenticatedPageLoad": new Date(),
        "LastLoginExamno": SCHOOL_ID!,
        "LastLoginUserName": USERNAME!,
        "ASP.NET_SessionId": "undefined",
        "lectiogsc": "undefined",
    };
    const joined = cookiesArray.join(";").split(";"); // convert broken array to one
    const sessionTokens: Partial<Pick<SessionCookies, 'lectiogsc' | 'ASP.NET_SessionId'>> = {};
    joined.forEach((kvpair) => {
        const split = kvpair.split("=");
        const key = split[0] ?? "";
        const value = split[1] ?? "";
        if (key == "lectiogsc" || key == "ASP.NET_SessionId")
            sessionTokens[key] = value;
    });

    return {...cookies, ...sessionTokens};
}

const lectioLoginPostResponse = async (validation: string) => {
    const method = "POST";
    const body = loginRequestBody(validation);
    const headers = {"Content-Type": "x-www-form-urlencoded"};
    const link = loginRequestLink();
    const res = await fetch(link, {
        headers,
        body,
        method,
    });
    return res;
}

const lectioLoginGetResponse = async () => {
    const method = "Get";
    const link = loginRequestLink();
    const res = await fetch(link, {
        method,
    });
    return res;
}

const htmlInputValue = (input: HTMLElement): string | null => {
    const attr = input.attributes.getNamedItem("value");
    if (!attr)
        return null;
    return attr.nodeValue;
}

const eventValidationFromParsedDoc = (htmldoc: Document): string => {
    const eventValidationInput = htmldoc.getElementById("__EVENTVALIDATION")
    if (!eventValidationInput)
        throw new Error("Unable to find Login Html");
    const value = htmlInputValue(eventValidationInput);
    if (!value)
        throw new Error("Unable to get event validation value");
    return value;
}

const eventValidationFromResHTML = (html: string) => {
    const parsedDoc = new DOMParser().parseFromString(html, 'text/html');
    const value = eventValidationFromParsedDoc(parsedDoc);
    return value;
}

export const getLectioSessionCookies = async (): Promise<SessionCookies> => {
    const getRes = await lectioLoginGetResponse();
    const validation = eventValidationFromResHTML(await getRes.text());
    const postRes = await lectioLoginPostResponse(validation);
    const cookiesRaw = extractCookiesFromHeader(postRes.headers);
    const formatted = setCookiesHeaderToInterface(cookiesRaw);
    return formatted;
}
