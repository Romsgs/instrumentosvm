import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registrarEmprestimo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { educandoId, instrumentoId } = req.body;

  try {
    // Verificar se o instrumento está disponível
    const instrumento = await prisma.instrumento.findUnique({
      where: { id: instrumentoId },
    });

    if (!instrumento || instrumento.borrowed_by) {
      return res
        .status(400)
        .json({ error: "Instrumento não está disponível para empréstimo." });
    }

    // Registrar empréstimo
    const emprestimo = await prisma.historicoEmprestimos.create({
      data: {
        educandoId,
        instrumentoId,
        status: "ativo",
      },
    });

    // Atualizar o instrumento para indicar que está emprestado
    await prisma.instrumento.update({
      where: { id: instrumentoId },
      data: { borrowed_by: educandoId },
    });

    return res
      .status(201)
      .json({ message: "Empréstimo registrado com sucesso.", emprestimo });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar empréstimo." });
  }
};

export const registrarDevolucao = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { emprestimoId } = req.body;

  try {
    // Verificar se o empréstimo existe
    const emprestimo = await prisma.historicoEmprestimos.findUnique({
      where: { id: emprestimoId },
    });

    if (!emprestimo || emprestimo.status === "concluído") {
      return res
        .status(400)
        .json({ error: "Empréstimo não encontrado ou já concluído." });
    }

    // Atualizar o empréstimo para indicar devolução
    await prisma.historicoEmprestimos.update({
      where: { id: emprestimoId },
      data: {
        dataDevolucao: new Date(),
        status: "concluído",
      },
    });

    // Atualizar o instrumento para indicar que está disponível
    await prisma.instrumento.update({
      where: { id: emprestimo.instrumentoId },
      data: { borrowed_by: null },
    });

    return res
      .status(200)
      .json({ message: "Devolução registrada com sucesso." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar devolução." });
  }
};
