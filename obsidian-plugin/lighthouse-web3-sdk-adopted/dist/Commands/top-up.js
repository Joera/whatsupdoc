"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = __importDefault(require("kleur"));
const ethers_1 = require("ethers");
const cli_spinner_1 = require("cli-spinner");
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const getNetwork_1 = require("./utils/getNetwork");
const readInput_1 = __importDefault(require("./utils/readInput"));
const lighthouse_config_1 = require("../lighthouse.config");
async function default_1(_amount) {
    try {
        if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')) {
            throw new Error('Wallet not created/imported');
        }
        let spinner = new cli_spinner_1.Spinner('');
        spinner.start();
        const balance = await Lighthouse_1.default.getBalance(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY'));
        spinner.stop();
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
        if (!balance) {
            throw new Error('Error fetching balance!');
        }
        // Get key
        const options = {
            prompt: 'Enter your password: ',
            silent: true,
            default: '',
        };
        const password = await (0, readInput_1.default)(options);
        const decryptedWallet = ethers_1.ethers.Wallet.fromEncryptedJsonSync(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_WALLET'), password.trim());
        if (!decryptedWallet) {
            throw new Error('Incorrect password!');
        }
        const network = (0, getNetwork_1.getNetwork)();
        if (network === 'polygon-testnet') {
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
                {
                    inputs: [],
                    name: 'decimals',
                    outputs: [
                        {
                            internalType: 'uint8',
                            name: '',
                            type: 'uint8',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'spender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                    ],
                    name: 'approve',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ];
            const contractDepositABI = [
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: '_tokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: '_amount',
                            type: 'uint256',
                        },
                    ],
                    name: 'addDeposit',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: '_address',
                            type: 'address',
                        },
                    ],
                    name: 'getAvailableSpace',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];
            const contractUSDC = new ethers_1.ethers.Contract(lighthouse_config_1.lighthouseConfig[network]['usdc_contract_address'], contractABI, new ethers_1.ethers.Wallet(decryptedWallet.privateKey, provider));
            const contractDeposit = new ethers_1.ethers.Contract(lighthouse_config_1.lighthouseConfig[network]['deposit_contract_address'], contractDepositABI, new ethers_1.ethers.Wallet(decryptedWallet.privateKey, provider));
            console.log(kleur_1.default.yellow('USDC Balance: ') +
                Array(2).fill('\xa0').join('') +
                ethers_1.ethers.formatUnits(await contractUSDC.balanceOf(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY')), lighthouse_config_1.lighthouseConfig[network]['usd_contract_decimal']));
            console.log(kleur_1.default.yellow('Current contract Storage Balance: ') +
                ((await contractDeposit.getAvailableSpace(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_PUBLICKEY'))) / lighthouse_config_1.lighthouseConfig.gbInBytes).toFixed(2) +
                'GB');
            const amount = ethers_1.ethers
                .parseUnits(String(_amount), await contractUSDC.decimals())
                .toString();
            spinner = new cli_spinner_1.Spinner(`Getting Approval to spent $${String(_amount)}`);
            spinner.start();
            let tx = await contractUSDC.approve(lighthouse_config_1.lighthouseConfig[network]['deposit_contract_address'], amount);
            tx = await tx.wait();
            spinner.stop();
            spinner = new cli_spinner_1.Spinner(`Request top-up for  $${String(_amount)}`);
            spinner.start();
            tx = await contractDeposit.addDeposit(lighthouse_config_1.lighthouseConfig[network]['usdc_contract_address'], amount, {
                gasLimit: 500000,
            });
            tx = await tx.wait();
            spinner.stop();
            console.log('\n' +
                kleur_1.default.green('successful: ') +
                lighthouse_config_1.lighthouseConfig[network].scan +
                tx.transactionHash);
        }
        else {
            console.log(kleur_1.default.yellow(network) + ': Network not Supported yet for top up');
        }
    }
    catch (error) {
        console.log(kleur_1.default.red(error.message));
        process.exit(0);
    }
}
exports.default = default_1;
