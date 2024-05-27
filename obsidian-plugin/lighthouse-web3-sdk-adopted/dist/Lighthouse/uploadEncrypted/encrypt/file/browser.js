"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const kavach_1 = require("@lighthouse-web3/kavach");
const encryptionBrowser_1 = require("../../encryptionBrowser");
const lighthouse_config_1 = require("../../../../lighthouse.config");
const util_1 = require("../../../utils/util");
const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            reader.result && resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};
exports.default = async (files, apiKey, publicKey, auth_token, uploadProgressCallback) => {
    try {
        let keyMap = {};
        // Generate fileEncryptionKey
        // const { masterKey: fileEncryptionKey, keyShards } = await generate()
        // Upload file
        let mimeType = null;
        if (files.length === 1) {
            mimeType = files[0].type;
        }
        const endpoint = lighthouse_config_1.lighthouseConfig.lighthouseNode + '/api/v0/add?wrap-with-directory=false';
        const token = 'Bearer ' + apiKey;
        const fileArr = [];
        for (let i = 0; i < files.length; i++) {
            fileArr.push(files[i]);
        }
        (0, util_1.checkDuplicateFileNames)(fileArr);
        if (files.length > 1 && auth_token.startsWith("0x")) {
            throw new Error(JSON.stringify(`auth_token must be a JWT`));
        }
        const formData = new form_data_1.default();
        const boundary = Symbol();
        const filesParam = await Promise.all(fileArr.map(async (f) => {
            const { masterKey: fileEncryptionKey, keyShards } = await (0, kavach_1.generate)();
            const fileData = await readFileAsync(f);
            const encryptedData = await (0, encryptionBrowser_1.encryptFile)(fileData, fileEncryptionKey);
            keyMap = { ...keyMap, [f.name]: keyShards };
            return {
                data: new Blob([encryptedData], { type: f.type }),
                fileName: f.name,
                keyShards,
            };
        }));
        filesParam.forEach(function (item_) {
            return formData.append('file', item_.data, item_.fileName ? item_.fileName : 'file');
        });
        const response = await axios_1.default.post(endpoint, formData, {
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'Content-type': `multipart/form-data; boundary= ${boundary.toString()}`,
                Encryption: `${true}`,
                Authorization: token,
            },
            onUploadProgress: function (progressEvent) {
                if (progressEvent.total) {
                    const _progress = Math.round(progressEvent.loaded / progressEvent.total);
                    uploadProgressCallback({
                        progress: _progress,
                        total: progressEvent.total,
                        uploaded: progressEvent.loaded,
                    });
                }
            },
        });
        if (typeof response.data === 'string') {
            response.data = JSON.parse(`[${response.data.slice(0, -1)}]`.split('\n').join(','));
        }
        else {
            response.data = [response.data];
        }
        const savedKey = await Promise.all(response.data.map(async (data) => {
            return (0, kavach_1.saveShards)(publicKey, data.Hash, auth_token, keyMap[data.Name]);
        }));
        savedKey.forEach((_savedKey) => {
            if (!_savedKey.isSuccess) {
                throw new Error(JSON.stringify(_savedKey));
            }
        });
        // return response
        /*
          {
            data: [{
              Name: 'flow1.png',
              Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
              Size: '31735'
            }]
          }
        */
        return { data: response.data };
    }
    catch (error) {
        return error.message;
    }
};