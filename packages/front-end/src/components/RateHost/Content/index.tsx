'use client';
import MyProfilePhoto from '@/components/MyProfile/Photo';
import ProfileStats from '@/components/MyProfile/Stats';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '@account-kit/react';

type Props = {
  name: string;
  stars: number;
  greenPoints: number;
};

export default function RateHostContent({ name, stars, greenPoints }: Props) {
  const [calification, setCalification] = useState<number>(0);
  const updateHostCalification = (calification: number) => {
    setCalification(calification);
  };


  const user = useUser();

  const { mutate: checkout, isPending: isCheckoutPending } = useMutation({
    mutationFn: async () => {
      if (!user) return;
      return await axios.post('/api/checkOut', {
        address: user?.address,
        hypercertID: '4083388403051261561560495289181218537473',
        hostRate: 3,
      });
    },
  });

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='flex gap-4'>
        <MyProfilePhoto />
        <div className='flex flex-col items-start gap-1'>
          <p className='font-medium'>{name}</p>
          <ProfileStats value={stars} icon='/icons/stars-icon.svg' />
          <ProfileStats
            value={greenPoints}
            icon='/icons/green-points-icon.svg'
          />
        </div>
      </div>
      <p className='text-center text-textSoftGray text-xs'>
        Share your experience to help others trust this host. How would you rate
        them?
      </p>
      <div className='flex'>
        {Array.from({ length: calification }, (_, index) => index + 1).map(
          (index) => (
            <Image
              onClick={() => updateHostCalification(index)}
              key={index}
              width={28}
              height={28}
              src='/icons/calification-star-yellow-icon.svg'
              alt='starsIcon'
            />
          )
        )}
        {Array.from({ length: 5 - calification }, (_, index) => index + 1).map(
          (index) => (
            <Image
              onClick={() => updateHostCalification(index + calification)}
              key={index}
              width={28}
              height={28}
              src='/icons/calification-star-icon.svg'
              alt='starsIcon'
            />
          )
        )}
      </div>
    </div>
  );
}
