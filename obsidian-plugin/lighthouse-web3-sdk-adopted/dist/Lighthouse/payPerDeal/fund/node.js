"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const ethers_1 = require("ethers");
const erc20_1 = __importDefault(require("./abi/erc20"));
const lighthouseContract_1 = __importDefault(require("./abi/lighthouseContract"));
const lighthouse_config_1 = require("../../../lighthouse.config");
exports.default = async (amount, network, token, privateKey) => {
    try {
        if (!privateKey) {
            throw new Error("Private Key not found!!!");
        }
        const config = lighthouse_config_1.lighthouseConfig[network];
        if (!config) {
            throw new Error("Unsupported Network!!!");
        }
        const provider = new ethers_1.ethers.JsonRpcProvider(config.rpc);
        const getFeeData = await provider.getFeeData();
        const signer = new ethers_1.ethers.Wallet(privateKey, provider);
        if (token.toLowerCase() === "native") {
            const gasEstimate = await signer.estimateGas({
                to: config.lighthouse_contract_address,
                value: amount,
            });
            const tx = await signer.sendTransaction({
                to: config.lighthouse_contract_address,
                value: amount,
                gasLimit: gasEstimate,
                gasPrice: getFeeData.gasPrice,
            });
            await tx.wait();
            return tx;
        }
        else {
            const tokenAddress = config[`${token.toLowerCase()}_contract_address`];
            const paymentContract = new ethers_1.ethers.Contract(config.lighthouse_contract_address, lighthouseContract_1.default, signer);
            const erc20Contract = new ethers_1.ethers.Contract(tokenAddress, erc20_1.default, signer);
            const approvalData = erc20Contract.interface.encodeFunctionData("approve", [config.lighthouse_contract_address, amount]);
            const approvalTxObject = {
                to: tokenAddress,
                data: approvalData,
            };
            const gasEstimateForApproval = await signer.estimateGas(approvalTxObject);
            const approvalTx = await erc20Contract.approve(config.lighthouse_contract_address, amount, {
                gasLimit: gasEstimateForApproval,
                gasPrice: getFeeData.gasPrice,
            });
            await approvalTx.wait();
            const transferData = paymentContract.interface.encodeFunctionData("receiveToken", [amount, tokenAddress]);
            const transferTxObject = {
                to: config.lighthouse_contract_address,
                data: transferData,
            };
            const gasEstimateForTransfer = await signer.estimateGas(transferTxObject);
            const tx = await paymentContract.receiveToken(amount, tokenAddress, {
                gasLimit: gasEstimateForTransfer,
                gasPrice: getFeeData.gasPrice,
            });
            await tx.wait();
            return tx;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
};
