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

const getAuthorByName = async (name: string) => {
  const authors = await prisma.author.findMany({
    where: {
      authorName: {
        startsWith: name,
        mode: 'insensitive',
      }
    },
  });
  return authors;
}

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
  getAuthorByName,
  createAuthor
}