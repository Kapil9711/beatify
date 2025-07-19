"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFormatedResponse = ({ isSuccess = true, message = "Successfull", data = [], } = {}) => {
    const obj = { isSuccess: isSuccess, message: message, data };
    return obj;
};
exports.default = getFormatedResponse;
