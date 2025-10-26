import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'

const Body = () => {

    const {connection}=useConnection();
    const wallet=useWallet();
    const [balance,setBalance]=useState(null);

    useEffect(()=>{
        const fetchBalance=async ()=>{
            if(wallet.connected && wallet.publicKey)
            {
                const lamports=await connection.getBalance(wallet.publicKey)
                setBalance(lamports/1e9);
            }
            else
            {
                setBalance(null)
            }
        }
        fetchBalance();
        let interval;
        if(wallet.connected && wallet.publicKey){
            interval=setInterval(fetchBalance,500000);
        }

        return ()=> clearInterval(interval);

    },[wallet.connected,wallet.publicKey,connection]);


  return (
    <div>
        <div>
            Your Public Key : {wallet.connected ? wallet?.publicKey?.toBase58() : "Connect First"}
        </div>
        <div>
            Your Solana Balance : {balance}
        </div>
    </div>
  )
}

export default Body