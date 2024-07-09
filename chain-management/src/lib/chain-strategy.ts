export interface ChainStrategy {
  getBalance(address: string): Promise<string>;
  transfer(amount: string, recipient: string): Promise<string>;
  getAddress(): Promise<string>;
}
