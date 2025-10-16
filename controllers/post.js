import { PostRepository } from "../repositories/post.js";
import {
  GetPostsDTO,
  GetOnePostDTO,
  CreatePostDTO,
  CreateManyPostsDTO,
  UpdatePostDTO,
  DeletePostDTO,
  DeleteManyPostsDTO,
} from "../DTOs/postDTOs.js";

export function registerPostRoutes(fastify) {
  fastify.get(
    "/posts",
    { schema: GetPostsDTO },
    async function getPosts(request, reply) {
      // Return a list of posts
      const page = request.query.page || 1;
      const limit = request.query.limit || 10;
      const allPosts = await PostRepository.getAllPosts(page, limit);
      return allPosts;
    }
  );

  fastify.get(
    "/posts/:id",
    { schema: GetOnePostDTO },
    async function getPost(request, reply) {
      // Return a single post
      const id = request.params.id;
      let idInt = parseInt(id, 10);
      const onePost = await PostRepository.getOnePost(idInt);
      return onePost;
    }
  );

  fastify.post(
    "/posts",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: CreatePostDTO,
    },
    async function createPost(request, reply) {
      const post = request.body;
      post.author = request.user.id;
      const createdPost = await PostRepository.createPost(post);
      return createdPost;
    }
  );

  fastify.post(
    "/createmanyposts",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: CreateManyPostsDTO,
    },
    async function createManyPosts(request, reply) {
      // Create many new posts
      const posts = request.body;
      const createdPosts = await PostRepository.createManyPosts(posts);
      return createdPosts;
    }
  );

  fastify.put(
    "/posts/:id",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: UpdatePostDTO,
    },
    async function updatePost(request, reply) {
      const id = request.params.id;
      let idInt = parseInt(id, 10);
      if (request.user.id !== (await PostRepository.getOnePost(idInt)).author) {
        throw new Error("You are not the author of this post");
      }

      const post = request.body;

      const updatedPost = await PostRepository.updatePost(idInt, post);
      return updatedPost;
    }
  );

  fastify.delete(
    "/posts/:id",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: DeletePostDTO,
    },
    async function deletePost(request, reply) {
      const id = request.params.id;
      let idInt = parseInt(id, 10);
      if (request.user.id !== (await PostRepository.getOnePost(idInt)).author) {
        throw new Error("You are not the author of this post");
      }
      const deletedPost = await PostRepository.deletePost(idInt);
      return deletedPost;
    }
  );

  fastify.delete(
    "/deletemanyposts",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: DeleteManyPostsDTO,
    },
    async function deleteManyPosts(request, reply) {
      // Delete many posts
      const ids = request.body;
      const deletedPosts = await PostRepository.deleteManyPosts(ids);
      return deletedPosts;
    }
  );
}
