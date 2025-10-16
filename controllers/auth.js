import { AuthRepository } from "../repositories/auth.js";
import {
  LoginUserDTO,
  GetOneUserDTO,
  CreateUserDTO,
  GetUsersDTO,
} from "../DTOs/userDTOs.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createHash } from "crypto";
dotenv.config();

export function registerAuthRoutes(fastify) {
  fastify.get(
    "/user/:id",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: GetOneUserDTO,
    },
    async function getUser(request, reply) {
      const id = request.params.id;
      let idInt = parseInt(id, 10);
      const oneUser = await AuthRepository.getOneUser(idInt);
      return oneUser;
    }
  );

  fastify.get(
    "/users",
    {
      preHandler: fastify.auth([fastify.authUser]),
      schema: GetUsersDTO,
    },
    async function getUsers(request, reply) {
      const users = await AuthRepository.getUsers();
      return users;
    }
  );

  fastify.post(
    "/login",
    { schema: LoginUserDTO },
    async function login(request, reply) {
      let body = request.body;
      console.log("username => ", body.username);
      console.log("password => ", body.password);
      body.password = hashPassword(body.password);
      console.log("password hashé => ", body.password);
      const user = await AuthRepository.login(body.username, body.password);
      if (!user) {
        throw new Error("!!! MDP Invalide !!!");
      }
      user.token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return user;
    }
  );

  fastify.post(
    "/signup",
    { schema: CreateUserDTO },
    async function signup(request, reply) {
      let body = request.body;
      console.log("username => ", body.username);
      console.log("password => ", body.password);
      console.log("email => ", body.email);

      body.password = hashPassword(body.password);
      console.log("password hashé => ", body.password);

      const user = await AuthRepository.signup(
        body.username,
        body.password,
        body.email
      );
      return user;
    }
  );
}

function hashPassword(password) {
  return createHash("sha1")
    .update(password + process.env.SALT)
    .digest("hex");
}
