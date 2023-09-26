import { utils } from 'ethers';
import { PrimeSdk } from '../src';
import * as dotenv from 'dotenv';
import { BridgingQuotes, CrossChainServiceProvider } from '../src/sdk/data';
dotenv.config();

async function main(): Promise<void> {
  // initializating sdk...
  const primeSdk = new PrimeSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, {
    chainId: Number(process.env.CHAIN_ID),
    projectKey: process.env.PKEY, // project key
  });

  const XdaiUSDC = '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83'; // Xdai - USDC
  const MaticUSDC = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // Matic - USDC

  const fromChainId = 137;
  const toChainId = 100;
  const fromTokenAddress: string = MaticUSDC;
  const toTokenAddress: string = XdaiUSDC;

  // MATIC USDC has 6 decimals
  const fromAmount = utils.parseUnits('1', 6); // 10 USDC

  const quoteRequestPayload = {
    fromChainId: fromChainId,
    toChainId: toChainId,
    fromTokenAddress: fromTokenAddress,
    toTokenAddress: toTokenAddress,
    fromAddress: '0x06159453E00a00C05E15E5268355bbBf83d75948', // account address
    fromAmount: fromAmount,
    serviceProvider: CrossChainServiceProvider.LiFi, // Optional parameter
  };

  const quotes: BridgingQuotes = await primeSdk.getCrossChainQuotes(quoteRequestPayload);

  console.log('\x1b[33m%s\x1b[0m', `Quotes:`, JSON.stringify(quotes, null, "\t"));
}

main()
  .catch(console.error)
  .finally(() => process.exit());
