import { Router, Request, Response } from "express";
import {
  getAllEducandos,
  getEducandoById,
  createEducando,
  updateEducando,
  deleteEducando,
} from "../controllers/educando.controller";

const router = Router();

// Listar todos os educandos ativos
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    await getAllEducandos(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar educandos." });
  }
});

// Obter detalhes de um educando específico
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    await getEducandoById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar educando." });
  }
});

// Criar um novo educando
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    await createEducando(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar educando." });
  }
});

// Atualizar informações de um educando
router.patch("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    await updateEducando(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar educando." });
  }
});

// Desativar logicamente um educando
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    await deleteEducando(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao desativar educando." });
  }
});

export default router;
