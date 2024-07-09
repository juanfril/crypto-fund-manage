import { ChainContext } from '@crypto-fund-manage/chain-management';
import { Network } from '@xchainjs/xchain-client';
import React, { useState, useMemo } from 'react';

interface SendFundsProps {
  chain: string;
  network: Network;
}

const SendFunds: React.FC<SendFundsProps> = ({ chain, network }) => {
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const context = useMemo(() => new ChainContext(chain, network), [chain, network]);

  const sendFunds = async () => {
    const txId = await context.transfer(amount, recipient);
    console.log(txId);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Enviar Fondos</h2>
      <input
        className="border p-2 mb-2"
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Dirección del destinatario"
      />
      <input
        className="border p-2 mb-2"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Cantidad"
      />
      <button className="bg-blue-500 text-white p-2" onClick={sendFunds}>Enviar</button>
    </div>
  );
};

export default SendFunds;
