"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const kleur_1 = require("kleur");
const ethers_1 = require("ethers");
const getNetwork_1 = require("./utils/getNetwork");
const readInput_1 = __importDefault(require("./utils/readInput"));
const lighthouse_config_1 = require("../lighthouse.config");
async function default_1(data, options) {
    if (JSON.stringify(data) === '{}') {
        options.help();
    }
    else {
        try {
            const privateKey = data.privateKey;
            const options = {
                prompt: 'Set a password for your wallet:',
                silent: true,
                default: '',
            };
            const password = await (0, readInput_1.default)(options);
            const wallet = new ethers_1.ethers.Wallet(privateKey);
            if (!wallet) {
                throw new Error('Importing Wallet Failed!');
            }
            const _ = await axios_1.default.get(lighthouse_config_1.lighthouseConfig.lighthouseAPI +
                `/api/auth/get_message?publicKey=${wallet.address}`);
            const encryptedWallet = await wallet.encrypt(password.trim());
            getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_WALLET', encryptedWallet);
            getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_PUBLICKEY', wallet.address);
            console.log((0, kleur_1.cyan)('Public Key: ' + wallet.address) + (0, kleur_1.green)('\r\nWallet Imported!'));
        }
        catch (error) {
            console.log((0, kleur_1.red)(error.message));
            process.exit(0);
        }
    }
}
exports.default = default_1;
