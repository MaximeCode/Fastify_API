import { CategoryRepository } from "../repositories/category.js";
import {
  CreatePostCategoryDTO,
  GetCategoriesDTO,
  GetOneCategoryDTO,
  UpdateCategoryDTO,
  DeleteCategoryDTO,
} from "../DTOs/categoryDTOs.js";

export function registerCategoryRoutes(fastify) {
  fastify.get(
    "/category",
    {
      schema: GetCategoriesDTO,
    },
    async function getCategories(request, reply) {
      const categories = await CategoryRepository.getAllCategories();
      return categories;
    }
  );

  fastify.get(
    "/category/:id",
    {
      schema: GetOneCategoryDTO,
    },
    async function getOneCategory(request, reply) {
      const id = request.params.id;
      const oneCategory = await CategoryRepository.getOneCategory(id);
      return oneCategory;
    }
  );

  fastify.post(
    "/category",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: CreatePostCategoryDTO,
    },
    async function createPostCategory(request, reply) {
      const category = request.body;
      const createdCategory = await CategoryRepository.createCategory(category);
      return createdCategory;
    }
  );

  fastify.put(
    "/category/:id",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: UpdateCategoryDTO,
    },
    async function updateCategory(request, reply) {
      const id = request.params.id;
      let idInt = parseInt(id, 10);
      const category = request.body;
      const updatedCategory = await CategoryRepository.updateCategory(
        idInt,
        category
      );
      return updatedCategory;
    }
  );

  fastify.delete(
    "/category/:id",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: DeleteCategoryDTO,
    },
    async function deleteCategory(request, reply) {
      const id = request.params.id;
      let idInt = parseInt(id, 10);
      const deletedCategory = await CategoryRepository.deleteCategory(idInt);
      return deletedCategory;
    }
  );
}
