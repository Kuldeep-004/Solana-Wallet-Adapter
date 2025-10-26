import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react'

const Tokens = () => {

  const [token,setToken]=useState();
  const {connection}=useConnection();
  const wallet=useWallet();

  useEffect(()=>{

    if(!wallet.connected || !wallet.publicKey)
    {
      setToken();
      return ;
    }

    const fetchTokens=async()=>{

      const tokenAccount=await connection.getParsedToken(
        wallet.publicKey,
        {programId:new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")},
      );
      
      const filteredToken=tokenAccount.value.map((val)=>(
        {...val,account:{...val.account,lamports:val.account.lamports/1e9,owner:val.account.owner.toBase58()},pubkey:val.pubkey.toBase58()})
      );
      setToken(filteredToken);
    };
    fetchTokens();
  },[wallet.connected,wallet.publicKey])

  return (
    <div>
        <div>
          Other Tokens:
          <div className='flex gap-3'>
            {
              token ? token.map((val,index)=>{
                return(
                  <div key={index} className='bg-gray-700 p-4 rounded-md'>
                    <div>
                      Accociated Token Address:{val.pubkey}
                    </div>
                    <div>
                      executable:{val.account.executable ? "YES" : "NO"}
                    </div>
                    <div>
                      Owner:{val.account.owner}
                    </div>
                    <div>
                      Amount:{val.account.lamports}
                    </div>
                  </div>
                )
              }) : null
            }
          </div>
        </div>
    </div>
  )
}

export default Tokens;
