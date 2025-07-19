"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const pathVariables_1 = __importDefault(require("./config/pathVariables"));
const safe_1 = __importDefault(require("colors/safe"));
const routes_1 = __importDefault(require("./routes"));
const golobalErrorHandler_1 = __importDefault(require("./middleware/golobalErrorHandler"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // ⚠️ for dev only. Use specific domain in production
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// serve static file from public
app.use(express_1.default.static("public"));
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
app.use("/", routes_1.default);
// Middleware to handle errors
app.use(golobalErrorHandler_1.default);
const port = (pathVariables_1.default === null || pathVariables_1.default === void 0 ? void 0 : pathVariables_1.default.PORT) || 5000;
const node_env = (pathVariables_1.default === null || pathVariables_1.default === void 0 ? void 0 : pathVariables_1.default.NODE_ENV) || "development";
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnection_1.default)(pathVariables_1.default === null || pathVariables_1.default === void 0 ? void 0 : pathVariables_1.default.MONGO_URL);
        app.listen(5000, () => {
            console.log(safe_1.default.bgGreen(`server is running on port ${port} in ${node_env} mode \n`));
        });
    }
    catch (error) {
        if (error instanceof Error) {
            const msg = (error === null || error === void 0 ? void 0 : error.message) || "";
            console.log(safe_1.default.bgRed(msg));
        }
        console.log(error);
    }
});
start();
