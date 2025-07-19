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
const mongoose_1 = __importDefault(require("mongoose"));
const safe_1 = __importDefault(require("colors/safe"));
mongoose_1.default.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
const ConnectDb = (mongoUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const options = {
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };
        const conn = yield mongoose_1.default.connect(mongoUrl, options);
        console.log(safe_1.default.bgCyan(`\nDataBase Connected Successfully to ${(_a = conn === null || conn === void 0 ? void 0 : conn.connection) === null || _a === void 0 ? void 0 : _a.name} on ${(_b = conn === null || conn === void 0 ? void 0 : conn.connection) === null || _b === void 0 ? void 0 : _b.host}`));
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Connection To DB Failed ${error.name} , ${error.message}`);
        }
        else
            throw error;
    }
});
exports.default = ConnectDb;
