import { z } from "zod";

export const registrarEmprestimoSchema = z.object({
  body: z.object({
    educandoId: z.string().nonempty("O ID do educando é obrigatório."),
    instrumentoId: z.string().nonempty("O ID do instrumento é obrigatório."),
  }),
});

export const registrarDevolucaoSchema = z.object({
  body: z.object({
    emprestimoId: z.string().nonempty("O ID do empréstimo é obrigatório."),
  }),
});
