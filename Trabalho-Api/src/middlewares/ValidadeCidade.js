import { AppError } from "../utils/appError.js";

const validateCid = {
    id(req, res, next) {
        const { id } = req.params;
        
        if(!id) {
            return next(new AppError("ID deve ser um numero inteiro válido", 400));   
        }
        if(!/^\d+$/.test(id)) {
            return next(new AppError("ID deve ser um numero inteiro válido", 400));
        }

        next();
    },

    post(req, res, next) {
        let { nome } = req.body;

        if(nome === undefined) {
            return next(new AppError("O campo 'nome' é obrigatório", 400));
        }

        if(typeof nome !== "string") {
            return next(new AppError("O campo 'nome' deve ser uma string", 400));
        }

        nome = nome.trim();

        if(!nome) {
            return next(new AppError("O campo 'nome' deve ser preenchido", 400));
        }

        req.body.nome = nome;

        next();
    },
    put(req, res, next) {
        let { nome } = req.body;

        if(nome === undefined){
            return next(new AppError("O campo 'nome' é obrigatório no PUT", 400));
        }
        if(typeof nome !== 'string'){
            return next(new AppError("O campo 'nome' tem que ser uma string", 400));
        }

        nome = nome.trim();

        if(!nome){
            return next(new AppError("O campo 'nome' deve ser preenchido", 400));
        }
        
        req.body.nome = nome

        next()
    },
    patch(req, res, next) {
        let { nome } = req.body;

        if (nome === undefined){
            return next(new AppError("O campo 'nome' é obrigatório no patch", 400));
        }

        if(typeof nome !== "string"){
            return next(new AppError("O campo 'nome' tem que ser uma string", 400));
        }

        nome = nome.trim();

        if (!nome){
            return next(new AppError("O campo 'nome' tem que ser preenchido", 400));
        }

        req.body.nome = nome;

        next();
    }
}

export { validateCid };