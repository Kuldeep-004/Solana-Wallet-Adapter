import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import Navigator from './components/Navigator'
import Body from './components/Body'
import SolFaucet from './components/SolFaucet'
import Tokens from './components/Tokens'
import { LaunchPad } from './components/LaunchPad'

function App() {

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/VnIibTb2wcsZ2om_w098p"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className='text-white flex min-h-screen w-screen bg-gray-950 justify-between items-center flex-col'>
            <Navigator/>
            <Body/>
            <Tokens/>
            <SolFaucet/>
            <LaunchPad/>
            <div></div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
