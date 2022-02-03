import { AxiosInstance } from "axios";
import { DOMParser } from "@xmldom/xmldom";


const loginRequestBody = (validation: string) => {
    const { USERNAME, PASSWORD } = process.env;
    return `time=0&__EVENTTARGET=m%24Content%24submitbtn2&__EVENTARGUMENT=&__LASTFOCUS=&__SCROLLPOSITION=&__VIEWSTATEX=oAAAAGlpZQotNDQ2NjMxODMxaWwCawCBbAJoaWRsAmcCaWwCawFlA29mZmwCZwNpZGwCZwVpZGwCgWlkbAJnCWlkbASBaWwCawJlCU1lcmNhbnRlY2RnB2lkbAKBaWRsAoFpamlsAmsDcGRkZGRyAWUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fbAFlDG0kQ2hvb3NlVGVybQQAAAATVmFsaWRhdGVSZXF1ZXN0TW9kZQxhdXRvY29tcGxldGUJaW5uZXJodG1sB0NoZWNrZWQAfAMQd2K6j7U6ZnhEKY%2FchTQuoEA%3D&__VIEWSTATEY_KEY=&__VIEWSTATE=&__EVENTVALIDATION=${validation}&m%24Content%24username=${USERNAME}&m%24Content%24password=${PASSWORD}&masterfootervalue=X1%21%C3%86%C3%98%C3%85&LectioPostbackId=`
}

const loginRequestLink = () => {
    const { SCHOOL_ID } = process.env;
    return `https://www.lectio.dk/lectio/${SCHOOL_ID}/login.aspx`
}

const fillClientWithLectioLoginCookies = async (client: AxiosInstance, validation: string) => {
    const data = loginRequestBody(validation);
    const headers = {"Content-Type": "x-www-form-urlencoded"};
    const link = loginRequestLink();
    await client.post(link, {
        headers,
        data,
        responseType: "document",
    });
}

const lectioLoginGetResponse = async (client: AxiosInstance) => {
    const link = loginRequestLink();
    const res = await client.get(link, {
        responseType: "document",
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

export const fillClientWithLectioSessionCookies = async (client: AxiosInstance) => {
    const getRes = await lectioLoginGetResponse(client);
    const validation = eventValidationFromResHTML(getRes.data);
    await fillClientWithLectioLoginCookies(client, validation);
}
