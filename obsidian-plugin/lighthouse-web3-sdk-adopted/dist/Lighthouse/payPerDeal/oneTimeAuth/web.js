"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const axios_1 = __importDefault(require("axios"));
const ethers_1 = require("ethers");
const lighthouse_config_1 = require("../../../lighthouse.config");
exports.default = async () => {
    try {
        //@ts-ignore
        const provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const message = (await axios_1.default.get(`${lighthouse_config_1.lighthouseConfig.lighthouseAPI}/api/auth/get_message?publicKey=${signer.address}`)).data;
        const signature = await signer.signMessage(message);
        return `${signer.address}$${signature}`;
    }
    catch (error) {
        throw new Error(error.message);
    }
};