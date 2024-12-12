import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllInstrumentos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const instrumentos = await prisma.instrumento.findMany({
      where: { ativo: true },
    });
    console.log(instrumentos);

    return res.status(200).json(instrumentos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar instrumentos." });
  }
};

export const getInstrumentoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const instrumento = await prisma.instrumento.findUnique({
      where: { id },
    });

    if (!instrumento) {
      return res.status(404).json({ error: "Instrumento não encontrado." });
    }

    return res.status(200).json(instrumento);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar instrumento." });
  }
};

export const createInstrumento = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { tipo, tamanho, numero, condicao, observacao } = req.body;

  if (!tipo || !numero || !condicao) {
    return res
      .status(400)
      .json({ error: "Preencha todos os campos obrigatórios." });
  }

  try {
    const novoInstrumento = await prisma.instrumento.create({
      data: { tipo, tamanho, numero, condicao, observacao, ativo: true },
    });
    return res.status(201).json(novoInstrumento);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar instrumento." });
  }
};

export const updateInstrumento = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { tipo, tamanho, numero, condicao, observacao } = req.body;

  try {
    const instrumentoAtualizado = await prisma.instrumento.update({
      where: { id },
      data: { tipo, tamanho, numero, condicao, observacao },
    });
    return res.status(200).json(instrumentoAtualizado);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar instrumento." });
  }
};

export const deleteInstrumento = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const instrumentoDesativado = await prisma.instrumento.update({
      where: { id },
      data: { ativo: false },
    });
    return res.status(200).json({
      message: "Instrumento desativado com sucesso.",
      instrumento: instrumentoDesativado,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao desativar instrumento." });
  }
};
