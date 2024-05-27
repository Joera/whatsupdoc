"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const ethers_1 = require("ethers");
const getNetwork_1 = require("./utils/getNetwork");
const readInput_1 = __importDefault(require("./utils/readInput"));
async function default_1() {
    try {
        let options = {
            prompt: 'Enter old password for your wallet:',
            silent: true,
            default: '',
        };
        const oldPassword = await (0, readInput_1.default)(options);
        const decryptedWallet = ethers_1.ethers.Wallet.fromEncryptedJsonSync(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_WALLET'), oldPassword.trim());
        if (!decryptedWallet) {
            throw new Error('Incorrect Password!');
        }
        options = {
            prompt: 'Set new password for your wallet:',
            silent: true,
            default: '',
        };
        const newPassword = await (0, readInput_1.default)(options);
        const encryptedWallet = await decryptedWallet.encrypt(newPassword.trim());
        if (!encryptedWallet) {
            throw new Error('Password reset failed!');
        }
        getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_WALLET', encryptedWallet);
        getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_PUBLICKEY', decryptedWallet.address);
        console.log((0, kleur_1.cyan)('Public Key: ' + decryptedWallet.address) +
            (0, kleur_1.green)('\r\nPassword reset successful'));
    }
    catch (error) {
        console.log((0, kleur_1.red)(error.message));
        process.exit(0);
    }
}
exports.default = default_1;
