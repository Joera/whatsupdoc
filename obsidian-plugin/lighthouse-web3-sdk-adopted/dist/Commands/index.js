#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const kleur_1 = require("kleur");
const ipns_1 = __importDefault(require("./ipns"));
const wallet_1 = __importDefault(require("./wallet"));
const upload_1 = __importDefault(require("./upload"));
const api_key_1 = __importDefault(require("./api-key"));
const balance_1 = __importDefault(require("./balance"));
const share_file_1 = __importDefault(require("./share-file"));
const get_uploads_1 = __importDefault(require("./get-uploads"));
const deal_status_1 = __importDefault(require("./deal-status"));
const decrypt_file_1 = __importDefault(require("./decrypt-file"));
const create_wallet_1 = __importDefault(require("./create-wallet"));
const wallet_forget_1 = __importDefault(require("./wallet-forget"));
const import_wallet_1 = __importDefault(require("./import-wallet"));
const revoke_access_1 = __importDefault(require("./revoke-access"));
const reset_password_1 = __importDefault(require("./reset-password"));
const upload_encrypted_1 = __importDefault(require("./upload-encrypted"));
const podsi_1 = __importDefault(require("./podsi"));
const widgets = new commander_1.Command('lighthouse-web3');
commander_1.Command.prototype.helpInformation = function (context) {
    let desc = [];
    let options = [];
    if (context.command.commands.length) {
        desc = desc.concat([(0, kleur_1.green)('Commands') + '\r\t\t\t\t' + (0, kleur_1.gray)('Description')]);
        desc = desc.concat(context.command.commands.map((cmd) => {
            const name = cmd._name.trimEnd().trimStart();
            return ('  ' +
                name.padEnd(28 - name.length, ' ') +
                '\r\t\t\t\t' +
                cmd._description);
        }));
    }
    if (context.command.options.length) {
        options = options.concat([(0, kleur_1.yellow)('Options:')]);
        options = options.concat(context.command.options.map((cmd) => {
            const name = cmd.flags.trimEnd().trimStart();
            return ('  ' +
                name.padEnd(28 - name.length, ' ') +
                '\r\t\t\t\t' +
                cmd.description);
        }));
    }
    const cmdName = context.command?.parent?._name ?? '' + ' ' + context.command._name;
    const usage = [
        (0, kleur_1.yellow)('Usage: ') + cmdName + ' ' + (0, kleur_1.dim)(this.usage()),
        this.description(),
    ];
    return ['']
        .concat(usage)
        .concat(desc.concat(['\n']))
        .concat(options)
        .concat('')
        .join('\n');
};
widgets.addHelpText('before', 'Welcome to lighthouse-web3');
widgets.version('0.3.3');
widgets
    .command('wallet')
    .description('Returns wallet public address')
    .action(wallet_1.default);
widgets
    .command('import-wallet')
    .description('Import an existing wallet')
    .option('--key , --privateKey <key>', 'Private key to wallet')
    .action(import_wallet_1.default);
widgets
    .command('create-wallet')
    .description('Creates a new wallet')
    .action(create_wallet_1.default);
widgets
    .command('reset-password')
    .description('Change password of your wallet')
    .action(reset_password_1.default);
widgets
    .command('wallet-forget')
    .description('Remove previously saved wallet')
    .action(wallet_forget_1.default);
widgets
    .command('api-key')
    .description('Manage API key')
    .option('-n, --new', 'new API Key')
    .option('-i, --import <key>', 'To import existing api-key')
    .action(api_key_1.default);
widgets.command('balance').description('Get your data usage').action(balance_1.default);
widgets
    .command('ipns')
    .option('-gen, --generate-key', 'Generate IPNS Key')
    .option('-pub, --publish', 'Publish CID')
    .option('-l, --list', 'List all keys')
    .option('-r, --remove <key>', 'Remove Key')
    .option('-k, --key <key>', 'Publish Key argument')
    .option('-c, --cid <cid>', 'Publish CID argument')
    .description('IPNS service')
    .action(ipns_1.default);
widgets
    .command('podsi')
    .description('Show Proof of data segment inclusion')
    .argument('<cid>', 'CID of the file previously uploaded')
    .action(podsi_1.default);
widgets
    .command('upload')
    .description('Upload a file')
    .argument('<path>', 'Path to file')
    .action(upload_1.default);
widgets
    .command('upload-encrypted')
    .description('Upload a file encrypted')
    .argument('<path>', 'Path')
    .action(upload_encrypted_1.default);
widgets
    .command('decrypt-file')
    .argument('<cid>', 'File Cid')
    .description('Decrypt and download a file')
    .action(decrypt_file_1.default);
widgets
    .command('share-file')
    .description('Share access to other user')
    .argument('<cid>', 'File Cid')
    .argument('<address>', "access reciever's address")
    .action(share_file_1.default);
widgets
    .command('revoke-access')
    .description('Revoke Access on a file')
    .argument('<cid>', 'File Cid')
    .argument('<address>', "access reciever's address")
    .action(revoke_access_1.default);
widgets
    .command('deal-status')
    .argument('<cid>', 'File Cid')
    .description('Get filecoin deal status of a CID')
    .action(deal_status_1.default);
widgets
    .command('get-uploads')
    .description('Get details of file uploaded')
    .action(get_uploads_1.default);
widgets.addHelpText('after', '\r\nExample:' +
    '\r\n  New api-key' +
    Array(17).fill('\xa0').join('') +
    '  lighthouse-web3 api-key --new' +
    '\r\n  Create wallet' +
    Array(17).fill('\xa0').join('') +
    'lighthouse-web3 create-wallet' +
    '\r\n  Import wallet' +
    Array(17).fill('\xa0').join('') +
    'lighthouse-web3 import-wallet --key 0x7e9fd9a....a8600\r\n');
widgets.parse(process.argv);
