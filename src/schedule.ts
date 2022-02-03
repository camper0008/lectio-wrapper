import { AxiosInstance } from "axios";

const getScheduleLink = () => {
    const { SCHOOL_ID, STUDENT_ID } = process.env;
    const link = `https://www.lectio.dk/lectio/${SCHOOL_ID}/SkemaNy.aspx?type=elev&elevid=${STUDENT_ID}`
    return link;
}

export const getScheduleHTML = async (client: AxiosInstance) => {
    const link = getScheduleLink();
    const res = await client.get(link, {
        responseType: "document",
    });
    console.log(res.data);
}
