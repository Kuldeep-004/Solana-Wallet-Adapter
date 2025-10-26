import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';

const Navigator = () => {
  return (
    <div>
        <div className='flex '>
            <WalletMultiButton/>
            <WalletDisconnectButton/>
        </div>
    </div>
  )
}

export default Navigator