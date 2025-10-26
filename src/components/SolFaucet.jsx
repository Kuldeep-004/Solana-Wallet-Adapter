import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'

const SolFaucet = () => {

    const wallet=useWallet();
    const {connection}=useConnection();

    const airDrop=async ()=>{
        const val=Number(document.getElementById("solAmount").value);
        if(!val)
        {
            alert("Add Amount")
            return ;
        }
        const sig = await connection.requestAirdrop(wallet.publicKey, val * 1e9)
        console.log(sig)
        const confirm=await connection.confirmTransaction(sig,"confirmed");
        console.log(confirm);
    }

  return (
    <div>
        <p> SolFaucet</p>
        <div>
            <input type='number' id='solAmount' className='border border-white p-2'/>
            <button className='bg-gray-800 p-2 rounded-md cursor-pointer'
                    onClick={airDrop}
                    disabled={!wallet?.connected}>
                        Airdrop 1 Sol
            </button>
        </div>
    </div>
  )
}

export default SolFaucet