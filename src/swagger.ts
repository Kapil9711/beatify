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
        url: "https://beatify-8xbt.onrender.com",
        // pathVariable.NODE_ENV == "development"
        //   ? `http://localhost:${pathVariable.PORT || 5000}`
        //   : "https://beatify-8xbt.onrender.com",
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/swagger.ts", "src/swagger-docs/**/**/*.ts"], // <-- Adjust path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
