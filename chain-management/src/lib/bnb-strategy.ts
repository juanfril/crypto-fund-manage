import { Client } from '@xchainjs/xchain-binance';
import { assetAmount, assetToBase } from '@xchainjs/xchain-util';
import { ChainStrategy } from './chain-strategy';
import { Network } from '@xchainjs/xchain-client';

export class BnbStrategy implements ChainStrategy {
  private client: Client;

  constructor(network: Network) {
    this.client = new Client({ network });
  }

  async getBalance(address: string): Promise<string> {
    const balances = await this.client.getBalance(address);
    return balances
      .map((bal) => `${bal.asset.symbol}: ${bal.amount.amount().toString()}`)
      .join(', ');
  }

  async transfer(amount: string, recipient: string): Promise<string> {
    const txId = await this.client.transfer({
      amount: assetToBase(assetAmount(amount)),
      recipient,
    });
    return txId;
  }

  async getAddress(): Promise<string> {
    return this.client.getAddressAsync();
  }
}
