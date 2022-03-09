import { ValidationError } from "joi";
import { DEBUG_MODE } from "../config";
import { CustomErrorHandler } from "../services";

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;

    let data = {
        statusCode,
        message: "Internal Server Error",
        ...(DEBUG_MODE === "true" && { errorMessage: err.message }),
    };

    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            statusCode,
            message: err.message,
        };
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.statusCode;
        data = {
            statusCode,
            message: err.message
        }
    }

    return res.status(statusCode).json(data);
};

export default errorHandler;
