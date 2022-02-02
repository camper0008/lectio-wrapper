import dotenv from "dotenv";
import { getLectioSessionCookies } from "./login.js";

const main = async () => {
    dotenv.config();
    const cookies = await getLectioSessionCookies();
    console.log(cookies);
}

main();
