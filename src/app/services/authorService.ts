import exp from "constants";
import prisma from "../../../prisma/client";

const getAllAuthors = async () => {
  return await prisma.author.findMany();
};

const getAuthorById = async (id: number) => {
  return await prisma.author.findUnique({
    where: {
      id: id,
    },
  });
};

const createAuthor = async (name: string) => {
  return await prisma.author.create({
    data: {
      authorName: name,
    },
  });
};

export const authorService = {
  getAllAuthors,
  getAuthorById,
  createAuthor
}