import { PrismaClient } from "../generated/prisma/client/client.js";

let client = new PrismaClient();
await client.$connect();
console.log("Connected to the database");
export const prisma = client;
