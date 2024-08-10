import { attestHostReview } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address, hypercertID, hostRate, reviews } = await req.json(); // reviews es { stars: number; user: string }[]

  console.debug({ address, hypercertID, hostRate });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");
    const wallet = new Wallet(
      process.env.ATTESTATOR_SIGNER_PRIVATE_KEY as string,
      provider
    );
  
    const attestationId = await attestHostReview(
      wallet,
      address,
      hypercertID,
      address,
      reviews // { stars: number; user: string }[]
    );
    console.debug("Response:" + attestationId);
    return NextResponse.json({ receipt: attestationId });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
