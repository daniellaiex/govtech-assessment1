import prisma from "../../../prisma/client";

const getAllAuthors = async () => {
  return await prisma.author.findMany();
};

const searchAuthorByName = async (name: string) => {
  return await prisma.author.findMany({
    where: {
      OR: [
        {
          authorFirstName: {
            startsWith: name,
            mode: 'insensitive',
          },
        },
        {
          authorLastName: {
            startsWith: name,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}

const getAuthorByName = async (firstName: string, lastName: string) => {
  return await prisma.author.findFirst({
    where: {
      authorFirstName: firstName,
      authorLastName: lastName
    },
  });
}

const createAuthor = async (firstName: string, lastName: string) => {
  return await prisma.author.create({
    data: {
      authorFirstName: firstName,
      authorLastName: lastName
    },
  });
};

export const authorService = {
  getAllAuthors,
  searchAuthorByName,
  getAuthorByName,
  createAuthor
}