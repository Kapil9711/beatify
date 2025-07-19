"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const pathVariables_1 = __importDefault(require("./config/pathVariables"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "Auto-generated Swagger docs",
        },
        servers: [
            {
                url: `http://localhost:${pathVariables_1.default.PORT || 5000}`,
            },
        ],
    },
    apis: ["src/routes/**/*.ts", "src/swagger.ts", "src/swagger-docs/**/**/*.ts"], // <-- Adjust path to your route files
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
