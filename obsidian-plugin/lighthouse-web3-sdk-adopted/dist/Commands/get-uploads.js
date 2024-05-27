"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const getNetwork_1 = require("./utils/getNetwork");
const byteToSize_1 = __importDefault(require("./utils/byteToSize"));
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
async function default_1() {
    try {
        if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY')) {
            throw new Error('Please create api-key first: use api-key command');
        }
        const response = (await Lighthouse_1.default.getUploads(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'))).data;
        console.log('\r\n' +
            Array(4).fill('\xa0').join('') +
            (0, kleur_1.yellow)('CID') +
            Array(47).fill('\xa0').join('') +
            (0, kleur_1.yellow)('File Name') +
            Array(5).fill('\xa0').join('') +
            (0, kleur_1.yellow)('File Size'));
        for (let i = 0; i < response.fileList.length; i++) {
            console.log(Array(4).fill('\xa0').join('') +
                response.fileList[i]['cid'] +
                Array(4).fill('\xa0').join('') +
                response.fileList[i]['fileName'].substring(0, 10) +
                Array(4).fill('\xa0').join('') +
                (0, byteToSize_1.default)(parseInt(response.fileList[i]['fileSizeInBytes'])) +
                '\r\n');
        }
    }
    catch (error) {
        console.log((0, kleur_1.red)(error.message));
        process.exit(0);
    }
}
exports.default = default_1;
