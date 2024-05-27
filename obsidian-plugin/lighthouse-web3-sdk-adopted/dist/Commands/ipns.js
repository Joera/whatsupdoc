"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const getNetwork_1 = require("./utils/getNetwork");
async function default_1(_options) {
    try {
        if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY')) {
            throw new Error('Please create an API key first!');
        }
        if (_options.generateKey || _options.gen) {
            const key = await Lighthouse_1.default.generateKey(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'));
            console.log((0, kleur_1.yellow)('ipnsName: ') +
                (0, kleur_1.white)(key.data.ipnsName) +
                '\r\n' +
                (0, kleur_1.yellow)('ipnsId: ') +
                (0, kleur_1.white)(key.data.ipnsId));
        }
        if ((_options.publish || _options.pub) &&
            (_options.cid || _options.c) &&
            (_options.key || _options.k)) {
            const publishResponse = await Lighthouse_1.default.publishRecord(_options.cid, _options.key, getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'));
            console.log((0, kleur_1.yellow)('Published: ') +
                '\r\n' +
                (0, kleur_1.cyan)('Visit: ' +
                    'https://gateway.lighthouse.storage/ipns/' +
                    publishResponse.data.Name));
        }
        if (_options.remove || _options.r) {
            await Lighthouse_1.default.removeKey(_options.remove, getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'));
            console.log((0, kleur_1.green)('Record Removed!!!'));
        }
        if (_options.list || _options.l) {
            const keys = await Lighthouse_1.default.getAllKeys(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'));
            if (keys.data.length > 0) {
                console.log((0, kleur_1.yellow)('List of ipns records: \r\n'));
                for (let i = 0; i < keys.data.length; i++) {
                    console.log((0, kleur_1.yellow)('  Key:     ') +
                        keys.data[i].ipnsName +
                        '\r\n' +
                        (0, kleur_1.yellow)('  IPNS ID: ') +
                        keys.data[i].ipnsId +
                        '\r\n' +
                        (0, kleur_1.yellow)('  CID:     ') +
                        keys.data[i].cid +
                        '\r\n');
                }
            }
        }
    }
    catch (error) {
        console.log((0, kleur_1.red)(error.message));
        process.exit(0);
    }
}
exports.default = default_1;
