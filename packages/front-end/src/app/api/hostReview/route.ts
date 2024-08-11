import { attestHostReview } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address, hypercertID, reviews } = await req.json(); // reviews es { stars: number; user: string }[]

  console.debug({ address, hypercertID, reviews });

  try {
    const provider = new JsonRpcProvider("https://rpc.ankr.com/celo");
    const wallet = new Wallet(
      "e58aa0579165d19d30699c2572106d502aa5225c65023fcb0165acd3818b0268" as string,
      provider,
    );

    const attestationId = await attestHostReview(
      wallet,
      hypercertID,
      address,
      reviews, // { stars: number; user: string }[]
    );
    console.debug("Response:" + attestationId);
    return NextResponse.json({ receipt: attestationId });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
