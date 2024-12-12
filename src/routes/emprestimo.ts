import { Router } from "express";
import {
  registrarEmprestimo,
  registrarDevolucao,
} from "../controllers/emprestimo.controller";
import { validate } from "../middlewares/validate";
import {
  registrarEmprestimoSchema,
  registrarDevolucaoSchema,
} from "../schemas/emprestimo.schema";

const router = Router();

// Registrar empréstimo
router.post(
  "/registrar",
  validate(registrarEmprestimoSchema),
  async (req, res) => {
    await registrarEmprestimo(req, res);
  }
);

// Registrar devolução
router.post(
  "/devolver",
  validate(registrarDevolucaoSchema),
  async (req, res) => {
    await registrarDevolucao(req, res);
  }
);

export default router;
