import { attestSignOut } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { asttestationID } = await req.json();

  console.debug({ asttestationID });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");
    const wallet = new Wallet(
      process.env.ATTESTATOR_SIGNER_PRIVATE_KEY as string,
      provider
    );
    await attestSignOut(wallet, asttestationID);

    return NextResponse.json({ result: "OK" });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
