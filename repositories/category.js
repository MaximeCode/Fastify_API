import { prisma } from "../services/db.js";

export const CategoryRepository = {
  getAllCategories: async () => {
    const categories = await prisma.categories.findMany();
    return categories;
  },
  getOneCategory: async (id) => {
    const category = await prisma.categories.findUnique({
      where: { id: id },
    });
    return category;
  },
  createCategory: async (name) => {
    const category = await prisma.categories.create({
      data: name,
    });
    return category;
  },
  updateCategory: async (id, name) => {
    const category = await prisma.categories.update({
      where: { id: id },
      data: name,
    });
    return category;
  },
  deleteCategory: async (id) => {
    const category = await prisma.categories.delete({
      where: {
        id: id,
      },
    });
    return category;
  },
};
