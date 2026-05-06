import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath = path.join(__dirname, "../data/cidades.json");

async function readFile() {
    try {
        const data = await fs.readFile(filepath, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile(filepath, "[]");
            return [];
        }

        if (error instanceof SyntaxError) {
            throw new AppError("JSON inválido no arquivo de dados", 500);
        }

        throw new AppError("Erro ao ler arquivo de cidades", 500);
    }
}

async function writeFile(data) {
    try {
        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    } catch {
        throw new AppError("Erro ao salvar arquivo de cidades", 500);
    }
}

class CidadeService  {

    async getAll() {
        return await readFile();
    }

    async getById(id) {
        const cidades = await readFile();
        return cidades.find(c => c.id === Number(id));
    }

    async create(data) {
        const cidades = await readFile();

        const newId = cidades.length
            ? Math.max(...cidades.map(c => c.id)) + 1
            : 1;

        const newCidade = {
            id: newId,
            nome: data.nome
        };

        cidades.push(newCidade);
        await writeFile(cidades);

        return newCidade;
    }

    async updatePatch(id, data) {
        const cidades = await readFile();
        const index = cidades.findIndex(c => c.id === Number(id));

        if (index === -1) return null;

        cidades[index] = {
            ...cidades[index],
            ...data
        };

        await writeFile(cidades);

        return cidades[index];
    }

    async updatePut(id, data) {
        const cidades = await readFile();
        const index = cidades.findIndex(c => c.id === Number(id));

        if (index === -1) return null;

        cidades[index] = {
            id: Number(id),
            nome: data.nome
        };

        await writeFile(cidades);

        return cidades[index];
    }

    async delete(id) {
        const cidades = await readFile();
        const index = cidades.findIndex(c => c.id === Number(id));

        if (index === -1) return null;

        const deleted = cidades.splice(index, 1);
        await writeFile(cidades);

        return deleted[0];
    }
};

export const cidadeService = new CidadeService()