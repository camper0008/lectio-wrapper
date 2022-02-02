import dotenv from "dotenv";
import { getLectioSessionCookies } from "./login.js";
import { getScheduleHTML } from "./schedule.js";

const main = async () => {
    dotenv.config();
    const cookies = await getLectioSessionCookies();
    getScheduleHTML(cookies);
}

main();
