import { AuthRepository } from "../repositories/auth.js";
import jwt from "jsonwebtoken";

export function registerAuthMiddleware(fastify) {
  fastify.decorate("authUser", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ error: "Token not found" });
      return;
    }

    // Token => "Bearer <token>"
    const token = authHeader.replace("Bearer ", "");

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await AuthRepository.getOneUser(payload.id);
      if (!user) {
        res.status(401).send({ error: "User not found" });
        return;
      }
      // Ajout de l'utilisateur à la requête
      req.user = user;
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
      return;
    }
  });
}
