"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lighthouse_config_1 = require("../../lighthouse.config");
exports.default = async (authToken, lastKey = null) => {
    try {
        const uploads = (await axios_1.default.get(lighthouse_config_1.lighthouseConfig.lighthouseAPI +
            `/api/user/files_uploaded?lastKey=${lastKey}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })).data;
        /*
          {
            "fileList":[
                {
                  publicKey: '0xa3c960b3ba29367ecbcaf1430452c6cd7516f588',
                  fileName: 'flow1.png',
                  mimeType: 'image/png',
                  txHash: '0x7c9ee1585be6b85bef471a27535fb4b8d7551340152c36c025743c36fd0d1acc',
                  status: 'testnet',
                  createdAt: 1662880331683,
                  fileSizeInBytes: '31735',
                  cid: 'QmZvWp5Xdyi7z5QqGdXZP63QCBNoNvjupF1BohDULQcicA',
                  id: 'aaab8053-0f1e-4482-9f84-d413fad14266',
                  lastUpdate: 1662883207149,
                  encryption: true
                },
              ],
            "totalFiles": 75
          }
        */
        return { data: uploads };
    }
    catch (error) {
        throw new Error(error.message);
    }
};