import { Network } from '@xchainjs/xchain-client';
import React, { useEffect, useMemo, useState } from 'react'
import {ChainContext} from '@crypto-fund-manage/chain-management'

interface BalanceProps {
  chain: string;
  address: string;
  network: Network
}

export const Balance: React.FC<BalanceProps> = ({chain, address, network}) => {
  const [balance, setBalance] = useState<string | null>(null)
  const context = useMemo(() => new ChainContext(chain, network), [chain, network]);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await context.getBalance(address)
      setBalance(balance)
    }
    fetchBalance()
  }, [address, context])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Balance de fondos</h2>
      {balance ? balance : 'Cargando...'}
    </div>
  );
};
