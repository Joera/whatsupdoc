"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = require("kleur");
const ethers_1 = require("ethers");
const path_1 = require("path");
const readInput_1 = __importDefault(require("./utils/readInput"));
const cli_spinner_1 = require("cli-spinner");
const Lighthouse_1 = __importDefault(require("../Lighthouse"));
const byteToSize_1 = __importDefault(require("./utils/byteToSize"));
const getNetwork_1 = require("./utils/getNetwork");
const getQuote = async (path, apiKey, Spinner) => {
    const spinner = new Spinner('Getting Quote...');
    spinner.start();
    const quoteResponse = (await Lighthouse_1.default.getQuote(path, apiKey)).data;
    spinner.stop();
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    if (!quoteResponse) {
        console.log((0, kleur_1.red)('Error getting quote!'));
        console.log((0, kleur_1.yellow)('Check if the wallet is imported!'));
        process.exit();
    }
    console.log((0, kleur_1.cyan)('Name') +
        Array(30).fill('\xa0').join('') +
        (0, kleur_1.cyan)('Size') +
        Array(8).fill('\xa0').join('') +
        (0, kleur_1.cyan)('Type') +
        Array(20).fill('\xa0').join(''));
    for (let i = 0; i < quoteResponse.metaData.length; i++) {
        const fileName = quoteResponse.metaData[i].fileName
            .split(/\\/g)
            .slice(-1)[0]
            .substring(0, 20);
        console.log(fileName +
            Array(34 - (fileName ?? '').length)
                .fill('\xa0')
                .join('') +
            (0, byteToSize_1.default)(quoteResponse.metaData[i].fileSize) +
            Array(12 - (0, byteToSize_1.default)(quoteResponse.metaData[i].fileSize).toString().length)
                .fill('\xa0')
                .join('') +
            quoteResponse.metaData[i].mimeType);
    }
    console.log('\r\n' +
        (0, kleur_1.cyan)('Summary') +
        '\r\nTotal Size: ' +
        (0, byteToSize_1.default)(quoteResponse.totalSize));
    console.log('Data Limit: ' +
        (0, byteToSize_1.default)(parseInt(quoteResponse.dataLimit)) +
        '\r\nData Used : ' +
        (0, byteToSize_1.default)(parseInt(quoteResponse.dataUsed)) +
        '\r\nAfter Upload: ' +
        (0, byteToSize_1.default)(parseInt(quoteResponse.dataLimit) -
            (parseInt(quoteResponse.dataUsed) + quoteResponse.totalSize)));
    const remainingAfterUpload = parseInt(quoteResponse.dataLimit) -
        (parseInt(quoteResponse.dataUsed) + quoteResponse.totalSize);
    return {
        fileName: quoteResponse.metaData[0].fileName,
        fileSize: quoteResponse.metaData[0].fileSize,
        cost: quoteResponse?.totalCost,
        type: quoteResponse?.type,
        remainingAfterUpload: remainingAfterUpload,
    };
};
const uploadFile = async (path, apiKey) => {
    const spinner = new cli_spinner_1.Spinner('Uploading...');
    spinner.start();
    const uploadResponse = (await Lighthouse_1.default.upload(path, apiKey)).data;
    spinner.stop();
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    if (!uploadResponse.Hash) {
        console.log((0, kleur_1.red)('Upload failed!'));
        console.log((0, kleur_1.yellow)('Check if api key is correct or create a new key!'));
        process.exit();
    }
    console.log((0, kleur_1.green)('File Uploaded, visit following url to view content!\r\n') +
        (0, kleur_1.cyan)('Visit: ' +
            'https://gateway.lighthouse.storage/ipfs/' +
            uploadResponse.Hash +
            '\r\n') +
        (0, kleur_1.cyan)(Array(7).fill('\xa0').join('') +
            'https://ipfs.io/ipfs/' +
            uploadResponse.Hash));
    console.log('CID: ' + uploadResponse.Hash);
    return;
};
async function default_1(_path) {
    if (!_path) {
        console.log('lighthouse-web3 upload <path>\r\n\r\n' +
            (0, kleur_1.green)('Description: ') +
            'Upload a file\r\n\r\n' +
            (0, kleur_1.cyan)('Options:\r\n') +
            Array(3).fill('\xa0').join('') +
            '--path: Required, path to file\r\n\r\n' +
            (0, kleur_1.magenta)('Example:') +
            Array(3).fill('\xa0').join('') +
            'lighthouse-web3 upload /home/cosmos/Desktop/ILoveAnime.jpg\r\n');
    }
    else {
        try {
            // Import nodejs specific library
            const path = (0, path_1.resolve)(process.cwd(), _path);
            // Display Quote
            const quoteResponse = await getQuote(path, getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY'), cli_spinner_1.Spinner);
            // Upload
            console.log((0, kleur_1.green)('Carefully check the above details are correct, then confirm to complete this upload') + ' Y/n');
            const options = {
                prompt: '',
            };
            const selected = await (0, readInput_1.default)(options);
            if (selected.trim() === 'n' ||
                selected.trim() === 'N' ||
                selected.trim() === 'no') {
                throw new Error('Canceled Upload');
            }
            if (!getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY')) {
                throw new Error('Please create api-key first: use api-key command');
            }
            if (quoteResponse.remainingAfterUpload < 0) {
                throw new Error('File size larger than allowed limit. Please Recharge!!!');
            }
            const _options = {
                prompt: 'Enter your password: ',
                silent: true,
                default: '',
            };
            const password = await (0, readInput_1.default)(_options);
            const decryptedWallet = ethers_1.ethers.Wallet.fromEncryptedJsonSync(getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_WALLET'), password.trim());
            if (!decryptedWallet) {
                throw new Error('Incorrect password!');
            }
            const apiKey = getNetwork_1.config.get('LIGHTHOUSE_GLOBAL_API_KEY');
            await uploadFile(path, apiKey);
        }
        catch (error) {
            console.log((0, kleur_1.red)(error.message));
            process.exit(0);
        }
    }
}
exports.default = default_1;
