"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const kleur_1 = require("kleur");
const ethers_1 = require("ethers");
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const readInput_1 = __importDefault(require("./utils/readInput"));
const getNetwork_1 = require("./utils/getNetwork");
const lighthouse_config_1 = require("../lighthouse.config");
exports.default = async (data, options) => {
    if (JSON.stringify(data) === '{}') {
        console.log((0, kleur_1.yellow)('Select an option:'));
        options.help();
    }
    else {
        if (data.import) {
            getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_API_KEY', data.import);
            console.log((0, kleur_1.green)('\r\nApi Key imported!!'));
        }
        else {
            try {
                if (getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY') && !data.new) {
                    console.log((0, kleur_1.yellow)('\r\nApi Key: ') + getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'));
                }
                else {
                    if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_WALLET')) {
                        throw new Error('Create/Import wallet first!!!');
                    }
                    const options = {
                        prompt: 'Enter your password: ',
                        silent: true,
                        default: '',
                    };
                    const password = await (0, readInput_1.default)(options);
                    const decryptedWallet = ethers_1.ethers.Wallet.fromEncryptedJsonSync(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_WALLET'), password.trim());
                    const verificationMessage = (await axios_1.default.get(lighthouse_config_1.lighthouseConfig.lighthouseAPI +
                        `/api/auth/get_message?publicKey=${decryptedWallet.address}`)).data;
                    const signedMessage = await decryptedWallet.signMessage(verificationMessage);
                    const response = await Lighthouse_1.default.getApiKey(decryptedWallet.address, signedMessage);
                    getNetwork_1.config.set('LIGHTHOUSE_GLOBAL_API_KEY', response.data.apiKey);
                    console.log((0, kleur_1.yellow)('\r\nApi Key: ') + response.data.apiKey);
                }
            }
            catch (error) {
                console.log((0, kleur_1.red)(error.message));
                process.exit(0);
            }
        }
    }
};
