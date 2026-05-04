import { Router } from "express";
import { cidadeService } from "../services/cidadeService.js";
import { validateCid } from "../middlewares/validateCidade.js";
import { AppError } from "../utils/appError.js";
import { successResponse } from "../utils/response.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const cidades = await cidadeService.getAll();
        return successResponse(res, 200, "Cidades listadas com sucesso", cidades);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", validateCid.id, async (req, res, next) => {
    try {
        const { id } = req.params;

        const cidade = await cidadeService.getById(id);

        if (!cidade)
            throw new AppError("Cidade não encontrada", 404);

        return successResponse(res, 200, "Cidade encontrada", cidade);
    } catch (error) {
        next(error);
    }
});

router.post("/", validateCid.post, async (req, res, next) => {
    try {
        const novaCidade = await cidadeService.create(req.body);
        return successResponse(res, 201, "Cidade criada com sucesso", novaCidade);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", validateCid.id, validateCid.patch, async (req, res, next) => {
    try {
        const { id } = req.params;

        const cidade = await cidadeService.updatePatch(id, req.body);

        if (!cidade)
            throw new AppError("Cidade não encontrada", 404);

        return successResponse(res, 200, "Cidade atualizada", cidade);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", validateCid.id, validateCid.put, async (req, res, next) => {
    try {
        const { id } = req.params;

        const cidade = await cidadeService.updatePut(id, req.body);

        if (!cidade)
            throw new AppError("Cidade não encontrada", 404);

        return successResponse(res, 200, "Cidade substituída", cidade);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", validateCid.id, async (req, res, next) => {
    try {
        const { id } = req.params;

        const cidade = await cidadeService.delete(id);

        if (!cidade)
            throw new AppError("Cidade não encontrada", 404);

        return successResponse(res, 200, "Cidade deletada com sucesso");
    } catch (error) {
        next(error);
    }
});

export { router as cidadeRoutes };