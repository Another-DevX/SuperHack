'use client';
import InputWithLabel from '@/components/MyProfile/Data';
import { Button } from '@/components/ui/button';
import {
  REALIZE_IT_CONTRACT_ABI,
  REALIZE_IT_CONTRACT_ADDRESS,
} from '@/constants';
import { useWriteContract } from 'wagmi'

import { Loader2 } from 'lucide-react';

import React from 'react';
import { encodeFunctionData, erc20Abi, parseEther, type Address } from 'viem';

export default function AddActivityRewards() {
  const { writeContract } = useWriteContract()


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Aquí puedes recoger los datos del formulario si es necesario
    const formData = new FormData(event.currentTarget);
    const data = {
      tokenPoolAmount: formData.get('tokenPoolAmount'),
      rewardPerParticipant: formData.get('rewardPerParticipant'),
    };

    console.debug([
      localStorage.getItem('ActivityCID'),
      BigInt(data.tokenPoolAmount as string),
      false,
    ]);


     writeContract({ 
          abi: REALIZE_IT_CONTRACT_ABI,
          address: REALIZE_IT_CONTRACT_ADDRESS,
          functionName: 'createCampaign',
          args: [
            localStorage.getItem('ActivityCID'),
            BigInt(data.tokenPoolAmount as string),
            false,
          ],
       })

  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <InputWithLabel
        label='Token pool amount'
        type='text'
        placeHolder='100'
        name='tokenPoolAmount' // Añadir nombre para que pueda ser recogido en el handleSubmit
      />
      <InputWithLabel
        label='Reward per participant'
        type='text'
        placeHolder='10'
        name='rewardPerParticipant' // Añadir nombre para que pueda ser recogido en el handleSubmit
      />
      <Button type='submit'>
        Next</Button>
    </form>
  );
}
