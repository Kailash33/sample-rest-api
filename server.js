import express from "express";
import logger from 'morgan';
import cors from 'cors';
import { ENVIRONMENT, PORT } from "./config";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes";
import DatabaseConnection from "./database";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(logger('dev'));

new DatabaseConnection().connect().then(() => {
    console.log(`\n\n\nDATABASE CONNECTED...`);
}).catch(err => console.log('Connection Error: ', err));

app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Sample Api running successfully' });
})

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, console.log(`${ENVIRONMENT} => http://localhost:${PORT}`));
