import { errorResponse } from "../utils/response.js";

function notFoundHandler(req, res, next) {
    return errorResponse(
        res,
        404,
        `Rota '${req.originalUrl}' não encontrada`
    );
}

export { notFoundHandler };