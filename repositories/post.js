import { prisma } from "../services/db.js";
import { CategoryRepository } from "./category.js";

export const PostRepository = {
  getAllPosts: async (page, limit) => {
    const posts = await prisma.posts.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        categories: true,
      },
    });
    return posts;
  },
  getOnePost: async (id) => {
    const posts = await prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
    return posts;
  },
  createPost: async (post) => {
    console.log("post => ", post);
    let catName = await CategoryRepository.getOneCategory(post.category);
    const posts = await prisma.posts.create({
      data: post,
    });
    posts.category = catName.name;
    return posts;
  },
  createManyPosts: async (posts) => {
    const createdPosts = await prisma.posts.createMany({
      data: posts,
      skipDuplicates: true,
    });
    return createdPosts;
  },
  updatePost: async (id, post) => {
    console.log("post => ", post);
    let catName = "";
    if (post.category) {
      catName = await CategoryRepository.getOneCategory(post.category);
      console.log("post.category => ", post.category);
      console.log("BEFORE catName => ", catName);
    }
    const posts = await prisma.posts.update({
      where: {
        id: id,
      },
      data: post,
    });
    if (catName !== "") {
      console.log("AFTER catName.name => ", catName.name);
      posts.category = catName.name;
    }
    return posts;
  },
  deletePost: async (id) => {
    const posts = await prisma.posts.delete({
      where: {
        id: id,
      },
    });
    return posts;
  },
  deleteManyPosts: async (ids) => {
    // ids is an array of ids
    console.log("ids => ", ids);
    console.log("ids.length => ", ids.length);
    const posts = await prisma.posts.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    return posts;
  },
};
