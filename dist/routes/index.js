"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_1 = __importDefault(require("./v1"));
const api_docs_1 = __importDefault(require("./api-docs"));
const router = (0, express_1.Router)();
//version1
router.use("/api/v1", v1_1.default);
router.use('/api-docs', api_docs_1.default);
exports.default = router;
