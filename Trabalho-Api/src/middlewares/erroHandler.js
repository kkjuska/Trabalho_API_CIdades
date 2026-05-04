import { AppError } from "../utils/appError.js";
import { errorResponse } from "../utils/response.js";

function errorHandler(err, req, res, next) {
    if (err instanceof AppError || err.isOperational) {
        return errorResponse(
            res,
            err.statusCode || 400,
            err.message,
            err.details || null
        );
    }

    console.error("erro inesperado:", err);

    return errorResponse(
        res,
        500,
        "erro interno do servidor"
    );
}

export { errorHandler };

