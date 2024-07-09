import { ChainContext } from '@crypto-fund-manage/chain-management';
import { Network } from '@xchainjs/xchain-client';
import React, { useEffect, useState, useMemo } from 'react';

interface ReceiveFundsProps {
  chain: string;
  network: Network;
}

const ReceiveFunds: React.FC<ReceiveFundsProps> = ({ chain, network }) => {
  const [address, setAddress] = useState<string>('');
  const context = useMemo(() => new ChainContext(chain, network), [chain, network]);

  useEffect(() => {
    const fetchAddress = async () => {
      const addr = await context.getAddress();
      setAddress(addr);
    };
    fetchAddress();
  }, [context]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Recibir Fondos</h2>
      <p>Tu Dirección: {address}</p>
    </div>
  );
};

export default ReceiveFunds;
