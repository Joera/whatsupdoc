"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
const browser_1 = __importDefault(require("./browser"));
exports.default = async (text, apiKey, name = 'text') => {
    // Upload File to IPFS
    //@ts-ignore
    if (typeof window === "undefined") {
        return await (0, node_1.default)(text, apiKey, name);
    }
    else {
        return await (0, browser_1.default)(text, apiKey, name);
    }
};
