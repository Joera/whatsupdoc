"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const getNetwork_1 = require("./utils/getNetwork");
async function default_1(data) {
    try {
        if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')) {
            throw new Error('Please import wallet first!');
        }
        console.log((0, kleur_1.yellow)('Public Key:') +
            Array(4).fill('\xa0').join('') +
            getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY'));
        console.log((0, kleur_1.yellow)('Network:') + Array(7).fill('\xa0').join('') + (0, getNetwork_1.getNetwork)());
    }
    catch (error) {
        console.log((0, kleur_1.red)(error.message));
        process.exit(0);
    }
}
exports.default = default_1;