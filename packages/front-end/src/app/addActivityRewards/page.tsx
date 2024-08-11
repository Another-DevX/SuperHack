'use client';
import InputWithLabel from '@/components/MyProfile/Data';
import { Button } from '@/components/ui/button';
import {
  REALIZE_IT_CONTRACT_ABI,
  REALIZE_IT_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '@/constants';
import {
  useSendUserOperation,
  useSmartAccountClient,
} from '@account-kit/react';

import React from 'react';
import { encodeFunctionData, erc20Abi, parseEther, type Address } from 'viem';

export default function AddActivityRewards() {
  const { client } = useSmartAccountClient({ type: 'LightAccount',     policyId: "8114749c-f841-481e-981e-5c8fb3ff247f",  });
  const { sendUserOperation } = useSendUserOperation({
    client,
    // optional parameter that will wait for the transaction to be mined before returning
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      // [optional] Do something with the hash and request
    },
    onError: (error) => {
      // [optional] Do something with the error
    },
  });
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
    const approvalData = encodeFunctionData({
      abi: erc20Abi,
      functionName: 'approve',
      args: [
        REALIZE_IT_CONTRACT_ADDRESS,
        BigInt(parseEther(data.tokenPoolAmount as string))
      ],
    });

  

     sendUserOperation({
      uo: {
        target: REALIZE_IT_CONTRACT_ADDRESS as Address,
        data: encodeFunctionData({
          abi: REALIZE_IT_CONTRACT_ABI,
          functionName: 'createCampaign',
          args: [
            localStorage.getItem('ActivityCID'),
            BigInt(data.tokenPoolAmount as string),
            false,
          ],
        }),
        value: BigInt(0),
      },
    });
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
      <Button type='submit'>Next</Button>
    </form>
  );
}
