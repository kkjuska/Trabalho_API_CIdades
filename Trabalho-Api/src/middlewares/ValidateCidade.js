import { AppError } from "../utils/appError.js";

const validateCid = {

    id(req, res, next) {
        const { id } = req.params;

        if (!id || !/^\d+$/.test(id)) {
            return next(new AppError("ID deve ser um número inteiro válido", 400));
        }

        next();
    },

    post(req, res, next) {
        let { nome } = req.body;

        if (nome === undefined)
            return next(new AppError("O campo 'nome' é obrigatório", 400));

        if (typeof nome !== "string")
            return next(new AppError("O campo 'nome' deve ser uma string", 400));

        nome = nome.trim();

        if (!nome)
            return next(new AppError("O campo 'nome' deve ser preenchido", 400));

        req.body.nome = nome;
        next();
    },

    put(req, res, next) {
        return validateCid.post(req, res, next);
    },

    patch(req, res, next) {
        return validateCid.post(req, res, next);
    }
};

export { validateCid };