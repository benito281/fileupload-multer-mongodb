import { config } from "dotenv";
config();

export default {
    mongoUrl: process.env.MONGO_ATLAS
}