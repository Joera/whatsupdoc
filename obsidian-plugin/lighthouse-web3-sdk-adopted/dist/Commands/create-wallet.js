"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const ethers_1 = require("ethers");
const fs_1 = __importDefault(require("fs"));
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const readInput_1 = __importDefault(require("./utils/readInput"));
const getNetwork_1 = require("./utils/getNetwork");
exports.default = async (_, _options) => {
    try {
        const options = {
            prompt: 'Set a password for your wallet:',
            silent: true,
            timeout: 30000,
        };
        const password = await (0, readInput_1.default)(options);
        const encryptedWallet = (await Lighthouse_1.default.createWallet(password.trim()))
            .data.encryptedWallet;
        const decryptedWallet = ethers_1.ethers.Wallet.fromEncryptedJsonSync(encryptedWallet, password.trim());
        const publicKey = decryptedWallet.address;
        const privateKey = decryptedWallet.privateKey;
        if (!encryptedWallet) {
            throw new Error('Creating Wallet Failed!');
        }
        const saveWallet = {
            publicKey: publicKey,
            privateKey: privateKey,
        };
        fs_1.default.writeFile('wallet.json', JSON.stringify(saveWallet, null, 4), (err) => {
            if (err) {
                throw new Error('Saving Wallet Failed!');
            }
            else {
                getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_WALLET', encryptedWallet);
                getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_PUBLICKEY', publicKey);
                console.log((0, kleur_1.cyan)('Public Key: ' + publicKey) + (0, kleur_1.green)('\r\nWallet Created!'));
            }
        });
    }
    catch (error) {
        console.log((0, kleur_1.red)(error.message));
        process.exit(0);
    }
};
