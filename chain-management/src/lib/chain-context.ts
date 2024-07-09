import { Network } from '@xchainjs/xchain-client';
import { AvaxStrategy } from './avax-strategy';
import { ChainStrategy } from './chain-strategy';
import { BnbStrategy } from './bnb-strategy';

const strategies: { [key: string]: new (network: Network) => ChainStrategy } = {
  AVAX: AvaxStrategy,
  BNB: BnbStrategy,
};

export class ChainContext implements ChainStrategy {
  private strategy: ChainStrategy;

  constructor(chain: string, network: Network) {
    const StrategyClass = strategies[chain];
    if (!StrategyClass) {
      throw new Error('Unsopported chain');
    }
    this.strategy = new StrategyClass(network);
  }
  getBalance(address: string): Promise<string> {
    return this.strategy.getBalance(address);
  }
  transfer(amount: string, recipient: string): Promise<string> {
    return this.strategy.transfer(amount, recipient);
  }
  getAddress(): Promise<string> {
    return this.strategy.getAddress();
  }
}
