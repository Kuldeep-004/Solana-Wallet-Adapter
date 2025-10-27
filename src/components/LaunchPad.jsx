import { MINT_SIZE, TOKEN_PROGRAM_ID, createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMint, createMintToInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { useState } from 'react'

export const LaunchPad = () => {

    const [data,setData]=useState({Amount:0})
    const {connection}=useConnection();
    const wallet=useWallet();

    const handleSubmit=async ()=>{

        const mintKeypair=new Keypair();
        const rent=await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

        const tx=new Transaction();

        tx.add(
            SystemProgram.createAccount({
                fromPubkey:wallet.publicKey,
                newAccountPubkey:mintKeypair.publicKey,
                lamports:rent,
                space:MINT_SIZE,
                programId:TOKEN_PROGRAM_ID,
            })
        );

        tx.add(
            createInitializeMintInstruction(
                mintKeypair.publicKey,
                9,
                wallet.publicKey,
                wallet.publicKey,
                TOKEN_PROGRAM_ID,
            )
        );

        const userATA=await getAssociatedTokenAddress(mintKeypair.publicKey,wallet.publicKey);

        tx.add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                userATA,
                wallet.publicKey,
                mintKeypair.publicKey,
            )
        )

        tx.add(
            createMintToInstruction(
                mintKeypair.publicKey,
                userATA,
                wallet.publicKey,
                BigInt(data.Amount)*BigInt(1000000000),
            )
        )

        tx.feePayer=wallet.publicKey;
        tx.recentBlockhash=(await connection.getLatestBlockhash()).blockhash;
        tx.partialSign(mintKeypair);

        const res=await wallet.sendTransaction(tx,connection);

        console.log(res);
    }

    return (
    <div>
        <div className='flex flex-col text-2xl justify-center items-center p-6 gap-4 rounded-md bg-gray-400'>
            <p>Token LaunchPad</p>
            <input type='number' placeholder='Initial Supply' className='bg-gray-700 rounded-md p-3' onChange={(e)=>setData(prev=>({...prev,Amount:e.target.value}))}/>
            <button className='bg-gray-700 rounded-md p-3' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}
