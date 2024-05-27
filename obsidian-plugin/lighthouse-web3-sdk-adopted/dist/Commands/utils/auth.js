"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign_auth_message = void 0;
const ethers_1 = require("ethers");
const Lighthouse_1 = __importDefault(require("../../Lighthouse"));
const sign_auth_message = async (privateKey) => {
    const provider = new ethers_1.ethers.JsonRpcProvider();
    const signer = new ethers_1.ethers.Wallet(privateKey, provider);
    const messageRequested = (await Lighthouse_1.default.getAuthMessage(signer.address.toLocaleLowerCase())).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
};
exports.sign_auth_message = sign_auth_message;
