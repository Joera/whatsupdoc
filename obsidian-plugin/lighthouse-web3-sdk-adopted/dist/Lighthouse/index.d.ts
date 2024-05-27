import getQuote from './getQuote';
import getApiKey from './getApiKey';
import getBalance from './getBalance';
import dealStatus from './dealStatus';
import getUploads from './getUploads';
import getFileInfo from './getFileInfo';
import createWallet from './createWallet';
import fund from './payPerDeal/fund';
import getPrice from './payPerDeal/getPrice';
import oneTimeAuth from './payPerDeal/oneTimeAuth';
import shareFile from './encryption/shareFile';
import getAuthMessage from './encryption/getAuthMessage';
import revokeFileAccess from './encryption/revokeFileAccess';
import fetchEncryptionKey from './encryption/fetchEncryptionKey';
import applyAccessCondition from './encryption/applyAccessCondition';
import getAccessConditions from './encryption/getAccessConditions';
import upload from './upload/files';
import uploadText from './upload/text';
import uploadBuffer from './upload/buffer';
import decryptFile from './uploadEncrypted/decrypt';
import uploadEncrypted from './uploadEncrypted/encrypt/file';
import textUploadEncrypted from './uploadEncrypted/encrypt/text';
import generateKey from './ipns/generateKey';
import publishRecord from './ipns/publishRecord';
import getAllKeys from './ipns/getAllKeys';
import removeKey from './ipns/removeKey';
import posdi from './podsi';
export { fund, getPrice, oneTimeAuth, getQuote, getApiKey, getBalance, dealStatus, getUploads, getFileInfo, createWallet, shareFile, getAuthMessage, revokeFileAccess, fetchEncryptionKey, applyAccessCondition, getAccessConditions, upload, uploadText, uploadBuffer, uploadEncrypted, textUploadEncrypted, decryptFile, generateKey, publishRecord, getAllKeys, removeKey, posdi, };
declare const _default: {
    fund: (amount: number, network: string, token: string, privateKey?: string | undefined) => Promise<any>;
    getPrice: (pathOrSize: any, network: string, token?: string | undefined) => Promise<bigint>;
    oneTimeAuth: (privateKey?: string | undefined) => Promise<string>;
    getQuote: (path: string, apiKey: string) => Promise<{
        data: {
            metaData: {
                fileSize: any;
                mimeType: any;
                fileName: string | undefined;
            }[];
            dataLimit: number;
            dataUsed: number;
            totalSize: any;
        };
    }>;
    getApiKey: (publicKey: string, signedMessage: string) => Promise<import("./getApiKey").apiKeyResponse>;
    getBalance: (apiKey: string) => Promise<import("./getBalance").balanceResponse>;
    dealStatus: (cid: string) => Promise<import("./dealStatus").dealResponse>;
    getUploads: (authToken: string, lastKey?: string | null) => Promise<import("./getUploads").uploadsResponseType>;
    getFileInfo: (cid: string) => Promise<import("./getFileInfo").fileInfoType>;
    createWallet: (password: string) => Promise<import("./createWallet").createWalletResponse>;
    shareFile: (publicKey: string, shareTo: string[], cid: string, signedMessage: string) => Promise<import("./encryption/shareFile").shareResponse>;
    getAuthMessage: (publicKey: string) => Promise<import("./encryption/getAuthMessage").authMessageResponse>;
    revokeFileAccess: (publicKey: string, revokeTo: string | string[], cid: string, signedMessage: string) => Promise<import("./encryption/revokeFileAccess").revokeResponse>;
    fetchEncryptionKey: (cid: string, publicKey: string, signedMessage: string, dynamicData?: {}, shardCount?: number) => Promise<import("./encryption/fetchEncryptionKey").fetchEncryptionKeyResponse>;
    applyAccessCondition: (publicKey: string, cid: string, signedMessage: string, conditions: any, aggregator?: string | undefined, chainType?: import("@lighthouse-web3/kavach/dist/types").ChainType) => Promise<import("./encryption/applyAccessCondition").accessControlResponse>;
    getAccessConditions: (cid: string) => Promise<import("./encryption/getAccessConditions").getAccessConditionResponse>;
    upload: typeof upload;
    uploadText: (text: string, apiKey: string, name?: string) => Promise<{
        data: any;
    }>;
    uploadBuffer: (buffer: any, apiKey: string) => Promise<{
        data: any;
    }>;
    uploadEncrypted: (path: any, apiKey: string, publicKey: string, signedMessage: string, uploadProgressCallback?: ((data: any) => void) | undefined) => Promise<{
        data: import("../types").IFileUploadedResponse[];
    }>;
    textUploadEncrypted: (text: string, apiKey: string, publicKey: string, signedMessage: string, name?: string) => Promise<{
        data: any;
    }>;
    decryptFile: (cid: any, fileEncryptionKey: string, mimeType?: string) => Promise<any>;
    generateKey: (apiKey: string) => Promise<import("./ipns/generateKey").generateKeyResponse>;
    publishRecord: (cid: string, key: string, apiKey: string) => Promise<import("./ipns/publishRecord").publishRecordResponse>;
    getAllKeys: (apiKey: string) => Promise<import("./ipns/getAllKeys").keyDataResponse>;
    removeKey: (key: string, apiKey: string) => Promise<import("./ipns/removeKey").removeRecordResponse>;
    posdi: (cid: string) => Promise<{
        data: {
            pieceCID: string;
            dealInfo: {
                dealId: number;
                storageProvider: string;
                proof: {
                    verifierData: {
                        commPc: string;
                        sizePc: string;
                    };
                    inclusionProof: {
                        proofIndex: {
                            index: string;
                            path: string[];
                        };
                        proofSubtree: {
                            index: string;
                            path: string[];
                        };
                        indexRecord: {
                            checksum: string;
                            proofIndex: string;
                            proofSubtree: number;
                            size: number;
                        };
                    };
                };
            }[];
        };
    }>;
};
export default _default;
