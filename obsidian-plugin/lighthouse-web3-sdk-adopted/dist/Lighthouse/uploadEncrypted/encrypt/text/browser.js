"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const encryptionBrowser_1 = require("../../encryptionBrowser");
const kavach_1 = require("@lighthouse-web3/kavach");
const lighthouse_config_1 = require("../../../../lighthouse.config");
exports.default = async (text, apiKey, publicKey, signedMessage, name) => {
    try {
        const token = 'Bearer ' + apiKey;
        const endpoint = lighthouse_config_1.lighthouseConfig.lighthouseNode + '/api/v0/add';
        // Upload file
        const formDdata = new form_data_1.default();
        const { masterKey: fileEncryptionKey, keyShards } = await (0, kavach_1.generate)();
        const encoder = new TextEncoder();
        const encryptedData = await (0, encryptionBrowser_1.encryptFile)(encoder.encode(text).buffer, fileEncryptionKey);
        formDdata.append('file', new Blob([encryptedData], { type: "text/plain" }), name);
        const boundary = Symbol();
        const response = await axios_1.default.post(endpoint, formDdata, {
            withCredentials: false,
            maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large directories
            maxBodyLength: Infinity,
            headers: {
                'Content-type': `multipart/form-data; boundary= ${boundary.toString()}`,
                Encryption: 'true',
                'Mime-Type': 'text/plain',
                Authorization: token,
            },
        });
        const { error } = await (0, kavach_1.saveShards)(publicKey, response.data.Hash, signedMessage, keyShards);
        if (error) {
            throw new Error('Error encrypting file');
        }
        return { data: response.data };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
