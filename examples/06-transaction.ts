import { PrimeSdk } from '../src';
import * as dotenv from 'dotenv';

dotenv.config();

async function main(): Promise<void> {
  // initializating sdk...
  const primeSdk = new PrimeSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, {
    chainId: Number(process.env.CHAIN_ID),
    projectKey: process.env.PKEY, // project key
  });
  const hash = '0xaddffb541925883e996261cf5dce3819386b94fda6171355270345eea0575faa';
  const transaction = await primeSdk.getTransaction({ hash });

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet transaction:`, transaction);
}

main()
  .catch(console.error)
  .finally(() => process.exit());

