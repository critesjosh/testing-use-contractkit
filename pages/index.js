import { ContractKitProvider, useContractKit } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';
import { CeloContract } from '@celo/contractkit'
import React, { useState } from 'react'

export default function WrappedApp() {
  return (
    <ContractKitProvider
      dapp={{
        name: 'My awesome dApp',
        description: 'My awesome description',
        url: 'https://example.com',
      }}
    >
      <App />
    </ContractKitProvider>
  );
}

function Network() {
  const { network, updateNetwork } = useContractKit();
  return <div>Currently connected to {network.name}</div>
}


function App() {
  const { kit, connect, address, destroy } = useContractKit()

  const [feeCurrency, setFeeCurrency] = useState(CeloContract.GoldToken)

  return (
    <>
      {address ? (
        <div>
          <div>Connected to {address}</div>
          <button onClick={destroy}>Disconnect</button>
          <div>Fee Currency: {feeCurrency}</div>
          <button onClick={() => setFeeCurrency(CeloContract.StableToken)}>Set fee currency to cUSD</button>
          <Network />
        </div>
      ) : (
          <button onClick={connect}>Connect wallet</button>
        )}
    </>
  );
}