import express from "express";
import "dotenv/config";
import ConnectDb from "./db/dbConnection";
import pathVariable from "./config/pathVariables";
import colors from "colors/safe";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import allRoutes from "./routes";
import globalErrorHandler from "./middleware/golobalErrorHandler";
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// routes
// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", allRoutes);

// Middleware to handle errors
app.use(globalErrorHandler);

const port = pathVariable?.PORT || 5000;
const node_env = pathVariable?.NODE_ENV || "development";

const start = async () => {
  try {
    await ConnectDb(pathVariable?.MONGO_URL);
    app.listen(5000, () => {
      console.log(
        colors.bgGreen(
          `server is running on port ${port} in ${node_env} mode \n`
        )
      );
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const msg: string = error?.message || "";
      console.log(colors.bgRed(msg));
    }
    console.log(error);
  }
};

start();
