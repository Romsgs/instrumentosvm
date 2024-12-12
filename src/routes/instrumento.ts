import { Router, Request, Response } from "express";
import {
  getAllInstrumentos,
  getInstrumentoById,
  createInstrumento,
  updateInstrumento,
  deleteInstrumento,
} from "../controllers/instrumento.controller";

const router = Router();

// Listar todos os instrumentos ativos
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    await getAllInstrumentos(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar instrumentos." });
  }
});

// Obter detalhes de um instrumento específico
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    await getInstrumentoById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar instrumento." });
  }
});

// Criar um novo instrumento
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    await createInstrumento(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar instrumento." });
  }
});

// Atualizar informações de um instrumento
router.patch("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    await updateInstrumento(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar instrumento." });
  }
});

// Desativar logicamente um instrumento
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    await deleteInstrumento(req, res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao desativar instrumento." });
  }
});

export default router;
