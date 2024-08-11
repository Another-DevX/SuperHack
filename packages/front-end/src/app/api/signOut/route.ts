import { attestSignOut } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { attestationID } = await req.json();

  console.debug({ attestationID });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");
    const wallet = new Wallet(
        "e58aa0579165d19d30699c2572106d502aa5225c65023fcb0165acd3818b0268" as string,
      provider,
    );
    await attestSignOut(wallet, attestationID);

    return NextResponse.json({ result: "OK" });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
