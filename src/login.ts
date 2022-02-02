import fetch, { Headers } from "node-fetch";

const loginRequestBody = () => {
    return `time=0&__EVENTTARGET=m%24Content%24submitbtn2&__EVENTARGUMENT=&__LASTFOCUS=&__SCROLLPOSITION=&__VIEWSTATEX=oAAAAGlpZQotNDQ2NjMxODMxaWwCawCBbAJoaWRsAmcCaWwCawFlA29mZmwCZwNpZGwCZwVpZGwCgWlkbAJnCWlkbASBaWwCawJlCU1lcmNhbnRlY2RnB2lkbAKBaWRsAoFpamlsAmsDcGRkZGRyAWUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fbAFlDG0kQ2hvb3NlVGVybQQAAAATVmFsaWRhdGVSZXF1ZXN0TW9kZQxhdXRvY29tcGxldGUJaW5uZXJodG1sB0NoZWNrZWQAfAMQd2K6j7U6ZnhEKY%2FchTQuoEA%3D&__VIEWSTATEY_KEY=&__VIEWSTATE=&__EVENTVALIDATION=Mnyf1RIipZN0Kzwi4j0%2BKcMHEX5xE8YsG9L9MLgt0FdIeZS6eT0UO9IW4IZ8blqtdK8Nx6teWfAWZAdE%2BoaqAwUxKCCABdVQb7U%2FR8DG1lL7EM4ULDEmLXqsr4yn0MXESzh2ES16tc3BOrg1LLLPkzaF2njJC3WCsRko5LatOgHd8%2BIco3EPntWVfcaIeN7wv006eom0Vw89tVT9VW1ppg%3D%3D&m%24Content%24username=${process.env.USERNAME}&m%24Content%24password=${process.env.PASSWORD}&masterfootervalue=X1%21%C3%86%C3%98%C3%85&LectioPostbackId=`
}

const loginRequestLink = () => {
    return `https://www.lectio.dk/lectio/${process.env.SCHOOL_ID}/login.aspx`
}

const extractCookiesFromHeader = (requestHeader: Headers): string[] => {
    const header = requestHeader.raw()['set-cookie'];
    return header;
}

interface Cookies {
    "ASP.NET_SessionId": string,
    "BaseSchoolUrl": string, // idk what this means but normal value for 577 is 16287
    "isloggedin3": string, // idk what this means but normal value is Y 
    "LastAuthenticatedPageLoad": Date, // DATE TO STRING
    "LastLoginExamno": string, // SCHOOL_ID
    "LastLoginUserName": string, // USER_NAME
    "lectiogsc": string,
}

const setCookiesHeaderToInterface = (cookiesArray: string[]): Cookies => {
    const cookies: Cookies = {
        "BaseSchoolUrl": "16287", // idk what this means but normal value for school "577" is "16287"
        "isloggedin3": "Y", // idk what this means but normal value is Y 
        "LastAuthenticatedPageLoad": new Date(), // DATE TO STRING
        "LastLoginExamno": process.env.SCHOOL_ID!,
        "LastLoginUserName": process.env.USERNAME!,
        "ASP.NET_SessionId": "undefined",
        "lectiogsc": "undefined",
    };
    const joined = cookiesArray.join(";").split(";"); // convert broken array to one
    const sessionTokens: Partial<Cookies> = {};
    joined.forEach((kvpair) => {
        const split = kvpair.split("=");
        const key = split[0] ?? "";
        const value = split[1] ?? "";
        if (key == "lectiogsc" || key == "ASP.NET_SessionId")
            sessionTokens[key] = value;
    });

    return {...cookies, ...sessionTokens};
}

const getLectioLoginResponse = async () => {
    const method = "POST";
    const body = loginRequestBody();
    const headers = {"Content-Type": "x-www-form-urlencoded"};
    const link = loginRequestLink();
    const res = await fetch(link, {
        headers,
        body,
        method,
    });
    return res;
}

export const getLectioSessionCookies = async (): Promise<Cookies> => {
    const res = await getLectioLoginResponse();
    const cookiesRaw = extractCookiesFromHeader(res.headers);
    const formatted = setCookiesHeaderToInterface(cookiesRaw);
    return formatted;
}

/*
 {
	"Request Cookies": {
		"ASP.NET_SessionId": "VV3LZLO6YNQMQBDP45QMXZOTYJMLRZSZDLCTMFPIWCVFAPB4AGASAIBA",
		"BaseSchoolUrl": "16287",
		"isloggedin3": "Y",
		"LastAuthenticatedPageLoad": "Wed Feb 02 2022 11:48:59 GMT+0100 (Central European Standard Time)",
		"LastLoginExamno": "577",
		"LastLoginUserName": "thei1594",
		"lectiogsc": "754ea48e-7dc3-65ff-dfde-930f26d2bb4b"
	}
}
*/
