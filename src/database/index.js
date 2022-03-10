import mongoose from "mongoose";
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_SERVER } from '../config';

class DatabaseConnection {
    constructor() { }

    connect() {
        return mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_SERVER}/${DB_NAME}?retryWrites=true&w=majority`);
    }
}

export default DatabaseConnection;