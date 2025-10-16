export const LoginUserDTO = {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["username", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
        token: {
          type: "string",
        },
      },
      required: ["id", "username", "email"],
    },
  },
};

export const GetOneUserDTO = {
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "number" },
        username: { type: "string" },
        email: { type: "string" },
      },
      required: ["id", "username", "email"],
    },
  },
};

export const GetUsersDTO = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          username: { type: "string" },
          email: { type: "string" },
        },
      },
      required: ["id", "username", "email"],
    },
  },
};

export const CreateUserDTO = {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
      email: {
        type: "string",
      },
    },
    required: ["username", "password", "email"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
      },
      required: ["id", "username", "email"],
    },
  },
};
