import { AxiosInstance } from "axios";

const getScheduleLink = () => {
    const { SCHOOL_ID, STUDENT_ID } = process.env;
    const link = `https://www.lectio.dk/lectio/${SCHOOL_ID}/SkemaNy.aspx?type=elev&elevid=${STUDENT_ID}`
    return link;
}

export const getScheduleHTML = async (client: AxiosInstance) => {
    const link = getScheduleLink();
    const headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
    };
    const res = await client.get(link, {
        headers,
        responseType: "document",
    });
    console.log(res.data);
}
