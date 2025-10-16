export const GetPostsDTO = {
  querystring: {
    type: "object",
    properties: {
      page: {
        type: "number",
      },
      limit: {
        type: "number",
      },
    },
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          title: {
            type: "string",
          },
          texte: {
            type: "string",
          },
          category: {
            type: "string",
          },
          author: {
            type: "number",
          },
        },
      },
      required: ["id", "title", "texte", "author", "category"],
    },
  },
};

export const GetOnePostDTO = {
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
        title: { type: "string" },
        texte: { type: "string" },
        author: { type: "number" },
        category: {
          type: "string",
        },
      },
      required: ["id", "title", "texte", "author", "category"],
    },
  },
};

export const CreatePostDTO = {
  body: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      texte: {
        type: "string",
      },
      author: {
        type: "number",
      },
      category: {
        type: "number",
      },
    },
    required: ["title"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        title: {
          type: "string",
        },
        texte: {
          type: "string",
        },
        author: {
          type: "number",
        },
        category: {
          type: "string",
        },
      },
      required: ["id", "title", "texte", "author", "category"],
    },
  },
};

export const CreateManyPostsDTO = {
  body: {
    type: "array",
    items: {
      type: "object",
      properties: {
        title: { type: "string" },
        texte: { type: "string" },
        author: { type: "number" },
        category: { type: "number" },
      },
      required: ["id", "title", "texte"],
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        count: {
          type: "number",
        },
      },
      required: ["count"],
    },
  },
};

export const UpdatePostDTO = {
  body: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      texte: {
        type: "string",
      },
      category: {
        type: "number",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        title: {
          type: "string",
        },
        texte: {
          type: "string",
        },
        author: {
          type: "number",
        },
        category: {
          type: "string",
        },
      },
      required: ["id", "title", "texte", "author", "category"],
    },
  },
};

export const DeletePostDTO = {
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
        count: { type: "number" },
      },
      required: ["count"],
    },
  },
};

export const DeleteManyPostsDTO = {
  body: {
    type: "array",
    items: {
      type: "number",
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        count: { type: "number" },
      },
      required: ["count"],
    },
  },
};
