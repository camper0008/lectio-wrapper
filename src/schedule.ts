import fetch, { RequestInit, Headers } from "node-fetch";
import { SessionCookies, getFormattedSessionCookies } from "./cookies.js";

const getScheduleLink = () => {
    const { SCHOOL_ID, STUDENT_ID } = process.env;
    const link = `https://www.lectio.dk/lectio/${SCHOOL_ID}/SkemaNy.aspx?type=elev&elevid=${STUDENT_ID}`
    return link;
}

export const getScheduleHTML = async (sessionCookies: SessionCookies) => {
    const cookie = getFormattedSessionCookies(sessionCookies);
    const link = getScheduleLink();
    const headers = new Headers({
        cookie,
    });
    const res = await fetch(link, {
        headers,
        method: "GET",
        credentials: "include",
        referrer: "https://www.lectio.dk/lectio/577/login.aspx",
        mode: "cors"
    } as RequestInit);
    console.log(await res.text());

}
