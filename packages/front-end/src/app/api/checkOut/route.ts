import { attestCheckout } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address, hypercertID, hostRate } = await req.json();

  console.debug({ address, hypercertID, hostRate });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/celo");
    const wallet = new Wallet(
      "PRIVATE_KEY" as string,
      provider,
    );
    const attestationId = await attestCheckout(
      wallet,
      address,
      hypercertID,
      address,
      hostRate,
    );
    console.debug("Response:" + attestationId);
    return NextResponse.json({ receipt: attestationId });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
