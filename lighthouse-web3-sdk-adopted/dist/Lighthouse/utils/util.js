"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateFileNames = exports.addressValidator = exports.isPrivateKey = exports.isCID = void 0;
const ethers_1 = require("ethers");
const isCID = (cid) => {
    return /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58}|B[A-Z2-7]{58}|z[1-9A-HJ-NP-Za-km-z]{48}|F[0-9A-F]{50})*$/.test(cid);
};
exports.isCID = isCID;
const isPrivateKey = (key) => {
    return /^([0-9a-f]{64})$/i.test(key);
};
exports.isPrivateKey = isPrivateKey;
const addressValidator = (value) => {
    if (ethers_1.ethers.isAddress(value?.toLowerCase())) {
        return value.toLowerCase();
    }
    else if (/^[A-HJ-NP-Za-km-z1-9]*$/.test(value) && value.length == 44) {
        return value;
    }
    return '';
};
exports.addressValidator = addressValidator;
function checkDuplicateFileNames(files) {
    console.log(files);
    const fileNames = new Set();
    for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        const fileName = files[i].name;
        if (fileNames.has(fileName)) {
            throw new Error(`Duplicate file name found: ${fileName}`);
        }
        fileNames.add(fileName);
    }
}
exports.checkDuplicateFileNames = checkDuplicateFileNames;