import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // Continua para o próximo middleware ou rota
    } catch (error) {
      res.status(400).json({
        error: "Validação falhou",
        details: (error as any).errors, // Detalhes do Zod
      });
    }
  };
};
