import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import {
  useAccount,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import {
  decodeAbiParameters,
  parseAbiParameters,
  encodeFunctionData,
} from "viem";
import { REALIZE_IT_CONTRACT_ADDRESS } from "@/constants";
import type { Address } from "viem";
import { useIsVerified } from "@/hooks/useIsVerified";

const abi = [
  // Definición de la función `verifyPublicAddress`
  {
    inputs: [
      {
        internalType: "address",
        name: "address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "merkle_root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifier_hash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyPublicAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function MyProfileVerify() {
  const { address } = useAccount({
    type: "LightAccount",
  });
  const isVerified = useIsVerified();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
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

  const verifyProof = async (proof: ISuccessResult) => {
    try {
      const args = [
        address,
        BigInt(proof!.merkle_root),
        BigInt(proof!.nullifier_hash),
        decodeAbiParameters(
          parseAbiParameters("uint256[8]"),
          proof!.proof as `0x${string}`,
        )[0],
      ];

      await sendUserOperation({
        uo: {
          target: REALIZE_IT_CONTRACT_ADDRESS as Address,
          data: encodeFunctionData({
            abi,
            functionName: "verifyPublicAddress",
            args,
          }),
          value: BigInt(0),
        },
      });

      console.debug("Proof verified");
      // result.refetch()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isVerified ? (
        <Button className="w-auto h-8 flex gap-2 items-center justify-center bg-green-500 rounded-md px-3 py-2">
          <p className="text-white text-xs font-semibold py-1">Verified</p>
          <Image
            width={16}
            height={16}
            src="/icons/wordid-icon.svg"
            alt="wordId-icon"
          />
        </Button>
      ) : (
        <IDKitWidget
          app_id="app_staging_fa589b04290a1f98828f1ddc5e4b6394"
          action="verify-public-address"
          verification_level={VerificationLevel.Orb}
          onSuccess={verifyProof}
          signal={address}
        >
          {({ open }) => (
            <Button
              onClick={open}
              className="w-auto h-8 flex gap-2 items-center justify-center bg-softGray rounded-md px-3 py-2"
            >
              <p className="text-black text-xs font-semibold py-1">
                Verify with World ID
              </p>
              <Image
                width={16}
                height={16}
                src="/icons/wordid-icon.svg"
                alt="wordId-icon"
              />
            </Button>
          )}
        </IDKitWidget>
      )}
    </>
  );
}
