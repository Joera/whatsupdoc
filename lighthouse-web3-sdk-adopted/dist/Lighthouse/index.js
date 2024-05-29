"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posdi = exports.removeKey = exports.getAllKeys = exports.publishRecord = exports.generateKey = exports.decryptFile = exports.textUploadEncrypted = exports.uploadEncrypted = exports.uploadBuffer = exports.uploadText = exports.upload = exports.getAccessConditions = exports.applyAccessCondition = exports.fetchEncryptionKey = exports.revokeFileAccess = exports.getAuthMessage = exports.shareFile = exports.createWallet = exports.getFileInfo = exports.getUploads = exports.dealStatus = exports.getBalance = exports.getApiKey = exports.getQuote = exports.oneTimeAuth = exports.getPrice = exports.fund = void 0;
const getQuote_1 = __importDefault(require("./getQuote"));
exports.getQuote = getQuote_1.default;
const getApiKey_1 = __importDefault(require("./getApiKey"));
exports.getApiKey = getApiKey_1.default;
const getBalance_1 = __importDefault(require("./getBalance"));
exports.getBalance = getBalance_1.default;
const dealStatus_1 = __importDefault(require("./dealStatus"));
exports.dealStatus = dealStatus_1.default;
const getUploads_1 = __importDefault(require("./getUploads"));
exports.getUploads = getUploads_1.default;
const getFileInfo_1 = __importDefault(require("./getFileInfo"));
exports.getFileInfo = getFileInfo_1.default;
const createWallet_1 = __importDefault(require("./createWallet"));
exports.createWallet = createWallet_1.default;
// Pay per deal
const fund_1 = __importDefault(require("./payPerDeal/fund"));
exports.fund = fund_1.default;
const getPrice_1 = __importDefault(require("./payPerDeal/getPrice"));
exports.getPrice = getPrice_1.default;
const oneTimeAuth_1 = __importDefault(require("./payPerDeal/oneTimeAuth"));
exports.oneTimeAuth = oneTimeAuth_1.default;
// Encryption
const shareFile_1 = __importDefault(require("./encryption/shareFile"));
exports.shareFile = shareFile_1.default;
const getAuthMessage_1 = __importDefault(require("./encryption/getAuthMessage"));
exports.getAuthMessage = getAuthMessage_1.default;
const revokeFileAccess_1 = __importDefault(require("./encryption/revokeFileAccess"));
exports.revokeFileAccess = revokeFileAccess_1.default;
const fetchEncryptionKey_1 = __importDefault(require("./encryption/fetchEncryptionKey"));
exports.fetchEncryptionKey = fetchEncryptionKey_1.default;
const applyAccessCondition_1 = __importDefault(require("./encryption/applyAccessCondition"));
exports.applyAccessCondition = applyAccessCondition_1.default;
const getAccessConditions_1 = __importDefault(require("./encryption/getAccessConditions"));
exports.getAccessConditions = getAccessConditions_1.default;
// Upload
const files_1 = __importDefault(require("./upload/files"));
exports.upload = files_1.default;
const text_1 = __importDefault(require("./upload/text"));
exports.uploadText = text_1.default;
const buffer_1 = __importDefault(require("./upload/buffer"));
exports.uploadBuffer = buffer_1.default;
const decrypt_1 = __importDefault(require("./uploadEncrypted/decrypt"));
exports.decryptFile = decrypt_1.default;
const file_1 = __importDefault(require("./uploadEncrypted/encrypt/file"));
exports.uploadEncrypted = file_1.default;
const text_2 = __importDefault(require("./uploadEncrypted/encrypt/text"));
exports.textUploadEncrypted = text_2.default;
// IPNS
const generateKey_1 = __importDefault(require("./ipns/generateKey"));
exports.generateKey = generateKey_1.default;
const publishRecord_1 = __importDefault(require("./ipns/publishRecord"));
exports.publishRecord = publishRecord_1.default;
const getAllKeys_1 = __importDefault(require("./ipns/getAllKeys"));
exports.getAllKeys = getAllKeys_1.default;
const removeKey_1 = __importDefault(require("./ipns/removeKey"));
exports.removeKey = removeKey_1.default;
//PODSI
const podsi_1 = __importDefault(require("./podsi"));
exports.posdi = podsi_1.default;
exports.default = {
    fund: fund_1.default,
    getPrice: getPrice_1.default,
    oneTimeAuth: oneTimeAuth_1.default,
    getQuote: getQuote_1.default,
    getApiKey: getApiKey_1.default,
    getBalance: getBalance_1.default,
    dealStatus: dealStatus_1.default,
    getUploads: getUploads_1.default,
    getFileInfo: getFileInfo_1.default,
    createWallet: createWallet_1.default,
    shareFile: shareFile_1.default,
    getAuthMessage: getAuthMessage_1.default,
    revokeFileAccess: revokeFileAccess_1.default,
    fetchEncryptionKey: fetchEncryptionKey_1.default,
    applyAccessCondition: applyAccessCondition_1.default,
    getAccessConditions: getAccessConditions_1.default,
    upload: files_1.default,
    uploadText: text_1.default,
    uploadBuffer: buffer_1.default,
    uploadEncrypted: file_1.default,
    textUploadEncrypted: text_2.default,
    decryptFile: decrypt_1.default,
    generateKey: generateKey_1.default,
    publishRecord: publishRecord_1.default,
    getAllKeys: getAllKeys_1.default,
    removeKey: removeKey_1.default,
    posdi: podsi_1.default,
};