import { attestSignUp } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address, hypercertID } = await req.json();

  console.debug({ address, hypercertID });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");
    const wallet = new Wallet(
      process.env.ATTESTATOR_SIGNER_PRIVATE_KEY as string,
      provider
    );
    const attestationId = await attestSignUp(
      wallet,
      address,
      hypercertID,
      address
    );
    console.debug("Response:" + attestationId);
    return NextResponse.json({ receipt: attestationId });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
