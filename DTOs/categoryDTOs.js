export const GetCategoriesDTO = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
        required: ["id", "name"],
      },
    },
  },
};

export const GetOneCategoryDTO = {
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
        name: { type: "string" },
      },
      required: ["id", "name"],
    },
  },
};

export const CreatePostCategoryDTO = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
      },
      required: ["id", "name"],
    },
  },
};

export const UpdateCategoryDTO = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
      },
      required: ["id", "name"],
    },
  },
};

export const DeleteCategoryDTO = {
  params: {
    type: "object",
    properties: { id: { type: "number" } },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: { id: { type: "number" }, name: { type: "string" } },
      required: ["id", "name"],
    },
  },
};
