import { attestSignOut } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { attestationID } = await req.json();

  console.debug({ attestationID });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/celo");
    const wallet = new Wallet(
        "PRIVATE_KEY" as string,
      provider,
    );
    await attestSignOut(wallet, attestationID);

    return NextResponse.json({ result: "OK" });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
