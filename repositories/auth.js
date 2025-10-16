import { prisma } from "../services/db.js";

export const AuthRepository = {
  login: async (username, password) => {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
        password: password,
      },
    });
    return user;
  },
  signup: async (username, password, email) => {
    const user = await prisma.users.create({
      data: {
        username: username,
        password: password,
        email: email,
      },
    });
    return user;
  },
  getUsers: async () => {
    const users = await prisma.users.findMany();
    return users;
  },
  // get user by id or username
  getOneUser: async (id) => {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  },
};
