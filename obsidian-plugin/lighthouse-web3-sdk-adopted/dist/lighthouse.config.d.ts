declare const defaultConfig: {
    lighthouseAPI: string;
    lighthouseNode: string;
    lighthouseGateway: string;
    lighthouseBLSNode: string;
    network: string;
    fantom: {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        usdt_contract_address: string;
        usdc_contract_address: string;
        dai_contract_address: string;
        usd_contract_decimal: number;
        dai_contract_decimal: number;
    };
    polygon: {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        usdt_contract_address: string;
        usdc_contract_address: string;
        dai_contract_address: string;
        usdt_contract_decimal: number;
        usdc_contract_decimal: number;
        dai_contract_decimal: number;
        native_decimal: number;
    };
    binance: {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        usdt_contract_address: string;
        usdc_contract_address: string;
        dai_contract_address: string;
        usd_contract_decimal: number;
        dai_contract_decimal: number;
    };
    optimism: {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        usdt_contract_address: string;
        usdc_contract_address: string;
        dai_contract_address: string;
        usd_contract_decimal: number;
        dai_contract_decimal: number;
    };
    filecoin: {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        usdc_contract_address: string;
        usdc_contract_decimal: number;
        native_decimal: number;
    };
    calibration: {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        usdt_contract_address: string;
        usdt_contract_decimal: number;
        native_decimal: number;
    };
    'fantom-testnet': {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
    };
    'polygon-testnet': {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
        deposit_contract_address: string;
        usdc_contract_address: string;
        usd_contract_decimal: number;
    };
    'binance-testnet': {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
    };
    'optimism-testnet': {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
    };
    'wallaby-testnet': {
        symbol: string;
        rpc: string;
        scan: string;
        chain_id: string;
        lighthouse_contract_address: string;
    };
};
declare const typed: {
    [key: string]: any;
};
export { typed as lighthouseConfig, defaultConfig };
