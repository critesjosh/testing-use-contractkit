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

function SwitchFeeCurrency() {
  const [feeCurrency, setFeeCurrency] = useState(CeloContract.GoldToken)

  return (
    <>
      <div>Fee Currency: {feeCurrency}</div>
      {
        feeCurrency == "GoldToken" ? (
          <button onClick={() => setFeeCurrency(CeloContract.StableToken)}>Switch fee currency</button>
        ) : (
            <button onClick={() => setFeeCurrency(CeloContract.GoldToken)}>Switch fee currency</button>
          )
      }
    </>
  )
}


function App() {
  const { kit, connect, address, destroy } = useContractKit()

  return (
    <>
      {address ? (
        <div>
          <div>Connected to {address}</div>
          <button onClick={destroy}>Disconnect</button>
          <SwitchFeeCurrency />
          <Network />
        </div>
      )
        : (
          <button onClick={connect}>Connect wallet</button>
        )}
    </>
  );
}