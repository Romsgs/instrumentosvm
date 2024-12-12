import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEducandos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const educandos = await prisma.educando.findMany({
      where: { ativo: true },
      include: { instruments: true },
    });
    return res.status(200).json(educandos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar educandos." });
  }
};

export const getEducandoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const educando = await prisma.educando.findUnique({
      where: { id },
      include: { instruments: true },
    });

    if (!educando) {
      return res.status(404).json({ error: "Educando não encontrado." });
    }

    return res.status(200).json(educando);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar educando." });
  }
};

export const createEducando = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { nome, turno, horario } = req.body;

  if (!nome || !turno || !horario) {
    return res
      .status(400)
      .json({ error: "Preencha todos os campos obrigatórios." });
  }

  try {
    const novoEducando = await prisma.educando.create({
      data: { nome, turno, horario, ativo: true },
    });
    return res.status(201).json(novoEducando);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar educando." });
  }
};

export const updateEducando = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { nome, turno, horario } = req.body;

  try {
    const educandoAtualizado = await prisma.educando.update({
      where: { id },
      data: { nome, turno, horario },
    });
    return res.status(200).json(educandoAtualizado);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar educando." });
  }
};

export const deleteEducando = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const educandoDesativado = await prisma.educando.update({
      where: { id },
      data: { ativo: false },
    });
    return res.status(200).json({
      message: "Educando desativado com sucesso.",
      educando: educandoDesativado,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao desativar educando." });
  }
};
