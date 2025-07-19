import express from "express";
import "dotenv/config";
import ConnectDb from "./db/dbConnection";
import pathVariable from "./config/pathVariables";
import colors from "colors/safe";
import allRoutes from "./routes";
import globalErrorHandler from "./middleware/golobalErrorHandler";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*", // ⚠️ for dev only. Use specific domain in production
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// serve static file from public
app.use(express.static("public"));
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/", allRoutes);

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
