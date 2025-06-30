import swaggerJsdoc from "swagger-jsdoc";
import pathVariable from "./config/pathVariables";
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Auto-generated Swagger docs",
    },
    servers: [
      {
        url: `http://localhost:${pathVariable.PORT || 5000}`,
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/swagger.ts", "src/swagger-docs/**/**/*.ts"], // <-- Adjust path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
