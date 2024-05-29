"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const util_1 = require("../utils/util");
const lighthouse_config_1 = require("../../lighthouse.config");
exports.default = async (cid) => {
    try {
        // cid check
        if (!(0, util_1.isCID)(cid)) {
            throw new Error('Invalid CID');
        }
        // get file info
        const fileInfo = (await axios_1.default.get(lighthouse_config_1.lighthouseConfig.lighthouseAPI + `/api/lighthouse/file_info?cid=${cid}`)).data;
        /*
          return:
            {
              "fileSizeInBytes":"15256",
              "cid":"QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc",
              "encryption":false,
              "fileName":"testImages",
              "mimeType":null,
            }
        */
        return { data: fileInfo };
    }
    catch (error) {
        throw new Error(error.message);
    }
};