const swaggerDefinition = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Users API docs",
      version: "0.0.1",
    },
  },
  apis: ["./routers/*Router.js"],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routers/*Router.js"],
};

export default swaggerOptions;
