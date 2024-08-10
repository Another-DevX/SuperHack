import { attestSignUp } from "@/services/eas";
import { JsonRpcProvider, Wallet } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // @ts-expect-error req.json() is not yet typed
    const { address, hypercertID } = req.json();

    try {
        const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");
        const wallet = new Wallet(process.env.ATTESTATOR_SIGNER_PRIVATE_KEY as string, provider);
        await attestSignUp(wallet, address, BigInt(hypercertID), address);

        return NextResponse.json({ nais: "ok"  });
    } catch (e) {
        console.debug("Error:", e);
        return NextResponse.error();
    }
}
