import { Client, defaultAvaxParams } from '@xchainjs/xchain-avax';
import { ChainStrategy } from './chain-strategy';
import { Network } from '@xchainjs/xchain-client';
import { assetAmount, assetToBase } from '@xchainjs/xchain-util';
import { generateMnemonic } from 'bip39';

export class AvaxStrategy implements ChainStrategy {
  private client: Client;

  private mnemonic = generateMnemonic();

  constructor(network: Network) {
    this.client = new Client({
      network,
      phrase: this.mnemonic,
      ...defaultAvaxParams,
    });
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
    return await this.client.getAddressAsync();
  }
}
