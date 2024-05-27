"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
const browser_1 = __importDefault(require("./browser"));
async function uploadFiles(path, boundary, apiKey, multi, dealParameters, uploadProgressCallback) {
    // Upload File to IPFS
    if (multi) {
        //@ts-ignore
        if (typeof window === 'undefined') {
            return await (0, node_1.default)(path, boundary, apiKey, true, dealParameters);
        }
        else {
            return await (0, browser_1.default)(path, boundary, apiKey, true, dealParameters, uploadProgressCallback ||
                (() => {
                    return;
                }));
        }
    }
    else {
        //@ts-ignore
        if (typeof window === 'undefined') {
            return await (0, node_1.default)(path, boundary, apiKey, false, dealParameters);
        }
        else {
            return await (0, browser_1.default)(path, boundary, apiKey, false, dealParameters, uploadProgressCallback ||
                (() => {
                    return;
                }));
        }
    }
}
exports.default = uploadFiles;
