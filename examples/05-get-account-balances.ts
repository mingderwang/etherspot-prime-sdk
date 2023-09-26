import { PrimeSdk } from '../src';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    // initializating sdk...
    console.log('\x1b[33m%s\x1b[0m', Number(process.env.CHAIN_ID))
    console.log('\x1b[33m%s\x1b[0m', process.env.PKEY)
    const primeSdk = new PrimeSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, {
        chainId: Number(process.env.CHAIN_ID),
        projectKey: process.env.PKEY, // project key
    });

    const balances = await primeSdk.getAccountBalances({
        account: '0x06159453E00a00C05E15E5268355bbBf83d75948',// '0x06159453E00a00C05E15E5268355bbBf83d75948', // account address
        chainId: Number(process.env.CHAIN_ID),
    });
    console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet balances:`, balances);
}

main()
  .catch(console.error)
  .finally(() => process.exit());

