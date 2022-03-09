import dotenv from "dotenv";

dotenv.config({
    path: "./environments/.env.development"
});

export const {
    ENVIRONMENT,
    PORT,
    DEBUG_MODE,

    DB_SERVER,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,

    JWT_SECRET
} = process.env;
