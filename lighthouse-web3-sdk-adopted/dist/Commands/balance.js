"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const ethers_1 = require("ethers");
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const byteToSize_1 = __importDefault(require("./utils/byteToSize"));
const cli_spinner_1 = require("cli-spinner");
const getNetwork_1 = require("./utils/getNetwork");
const lighthouse_config_1 = require("../lighthouse.config");
async function default_1(data, options) {
    try {
        if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')) {
            throw new Error('Wallet not created/imported');
        }
        const spinner = new cli_spinner_1.Spinner('');
        spinner.start();
        const response = await Lighthouse_1.default.getBalance(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'));
        spinner.stop();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        process.stdout.clearLine(-1, () => { });
        process.stdout.cursorTo(0);
        console.log((0, kleur_1.yellow)('\r\nData Limit: ') +
            Array(4).fill('\xa0').join('') +
            (0, byteToSize_1.default)(response.data.dataLimit) +
            (0, kleur_1.yellow)('\r\nData Used: ') +
            Array(5).fill('\xa0').join('') +
            (0, byteToSize_1.default)(response.data.dataUsed) +
            (0, kleur_1.yellow)('\r\nData Remaining: ') +
            (0, byteToSize_1.default)(response.data.dataLimit - response.data.dataUsed));
        const network = (0, getNetwork_1.getNetwork)();
        if (network === 'polygon' ||
            network === 'fantom' ||
            network === 'binance' ||
            network === 'optimism') {
            const provider = new ethers_1.ethers.JsonRpcProvider(lighthouse_config_1.lighthouseConfig[network]['rpc']);
            const contractABI = [
                {
                    constant: true,
                    inputs: [{ name: 'account', type: 'address' }],
                    name: 'balanceOf',
                    outputs: [{ name: '', type: 'uint256' }],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
            ];
            const contractUSDT = new ethers_1.ethers.Contract(lighthouse_config_1.lighthouseConfig[network]['usdt_contract_address'], contractABI, provider);
            console.log((0, kleur_1.yellow)('\r\nUSDT Balance: ') +
                Array(2).fill('\xa0').join('') +
                ethers_1.ethers.formatUnits(await contractUSDT.balanceOf(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')), lighthouse_config_1.lighthouseConfig[network]['usd_contract_decimal']));
            const contractUSDC = new ethers_1.ethers.Contract(lighthouse_config_1.lighthouseConfig[network]['usdc_contract_address'], contractABI, provider);
            console.log((0, kleur_1.yellow)('USDC Balance: ') +
                Array(2).fill('\xa0').join('') +
                ethers_1.ethers.formatUnits(await contractUSDC.balanceOf(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')), lighthouse_config_1.lighthouseConfig[network]['usd_contract_decimal']));
            const contractDai = new ethers_1.ethers.Contract(lighthouse_config_1.lighthouseConfig[network]['dai_contract_address'], contractABI, provider);
            console.log((0, kleur_1.yellow)('DAI Balance: ') +
                Array(3).fill('\xa0').join('') +
                ethers_1.ethers.formatUnits(await contractDai.balanceOf(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')), lighthouse_config_1.lighthouseConfig[network]['dai_contract_decimal']));
            console.log((0, kleur_1.yellow)(network) +
                ':' +
                Array(15 - network.length)
                    .fill('\xa0')
                    .join('') +
                ethers_1.ethers.formatEther(await provider.getBalance(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY'))));
        }
    }
    catch (error) {
        console.log((0, kleur_1.red)(error.message));
        process.exit(0);
    }
}
exports.default = default_1;