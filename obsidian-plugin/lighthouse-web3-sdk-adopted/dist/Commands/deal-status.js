"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const byteToSize_1 = __importDefault(require("./utils/byteToSize"));
const showResponse = (cid, dealStatus) => {
    console.log((0, kleur_1.yellow)('\r\nCID:') +
        Array(9).fill('\xa0').join('') +
        cid +
        (0, kleur_1.yellow)('\r\nSize:') +
        Array(8).fill('\xa0').join('') +
        (0, byteToSize_1.default)(dealStatus[0]['content']) +
        '\r\n');
    console.log(Array(20).fill('\xa0').join('') +
        (0, kleur_1.yellow)('Miner : ') +
        Array(10).fill('\xa0').join('') +
        (0, kleur_1.yellow)('DealId: '));
    for (let i = 0; i < dealStatus.length; i++) {
        const gap = 10 + (8 - dealStatus[i]['miner'].length);
        console.log(Array(20).fill('\xa0').join('') +
            dealStatus[i]['miner'] +
            Array(gap).fill('\xa0').join('') +
            dealStatus[i]['dealId']);
    }
    console.log((0, kleur_1.green)('\r\nView deals at filfox URL:\r\n') +
        Array(4).fill('\xa0').join('') +
        'https://filfox.info/en/deal/' +
        dealStatus[0]['dealId']);
};
async function default_1(data, options) {
    if (JSON.stringify(data) === '{}') {
        console.log((0, kleur_1.yellow)('Select an option:'));
        options.help();
    }
    else {
        try {
            const dealStatus = (await Lighthouse_1.default.dealStatus(data)).data;
            dealStatus.length === 0
                ? console.log('Deal creation in progress')
                : showResponse(data, dealStatus);
        }
        catch (error) {
            console.log((0, kleur_1.red)(error.message));
            process.exit(0);
        }
    }
}
exports.default = default_1;
