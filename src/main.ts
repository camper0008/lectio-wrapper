import dotenv from "dotenv";
import { fillClientWithLectioSessionCookies } from "./login.js";
import { getScheduleHTML } from "./schedule.js";
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const main = async () => {
    dotenv.config();
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar }));
    await fillClientWithLectioSessionCookies(client);
    getScheduleHTML(client);
}

main();
