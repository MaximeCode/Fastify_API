import { test, expect } from "vitest";
import got from "got";

const client = got.extend({
  prefixUrl: "http://localhost:3000/",
  responseType: "json",
  throwHttpErrors: false,
});

//// Auth User
// Inscription User - OK
// test("POST /signup", async () => {
//   const response = await client.post("signup", {
//     json: {
//       username: "testuser",
//       password: "testpassword",
//       email: "testemail",
//     },
//     responseType: "json",
//   });
//   const data = response.body;
//   expect(response.statusCode).toBe(200);
//   expect(data).toHaveProperty("id");
//   expect(data.username).toBe("testuser");
//   expect(data.email).toBe("testemail");
//   expect(data).to.not.have.property("password");
// });

let token = "";
// Login User - OK
test("POST /login", async () => {
  const response = await client.post("login", {
    json: {
      username: "testuser",
      password: "testpassword",
    },
    responseType: "json",
  });
  const data = response.body;
  console.log("data => ", data);
  expect(data).toHaveProperty("id");
  token = data.token;
  console.log("token => ", token);
});

//// Posts
// Get all Posts
test("GET /posts", async () => {
  const response = await client.get("posts", {
    responseType: "json",
  });
  const data = response.body;
  expect(response.statusCode).toBe(200);
  expect(data[0]).toHaveProperty("id");
});

// Get one Post
test("GET /posts/:id", async () => {
  const response = await client.get("posts/4", {
    responseType: "json",
  });
  const data = response.body;
  expect(response.statusCode).toBe(200);
  expect(data).toHaveProperty("id");
});

// Create a new Post
test("POST /posts", async () => {
  const response = await client.post("posts", {
    headers: {
      authorization: `Bearer ${token}`,
    },
    json: {
      title: "test titre",
      texte: "test texte",
      category: 3,
    },
    responseType: "json",
  });
  const data = response.body;
  console.log("data => ", data);
  console.log("response.statusCode => ", response.statusCode);
  expect(response.statusCode).toBe(200);
  expect(data).toHaveProperty("id");
});
