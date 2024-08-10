import { uploadHypercertMetadata } from "@/services/hypercerts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const tx = await uploadHypercertMetadata();
    console.debug("Transaction:", tx);
    return NextResponse.json({ receipt: tx });
  } catch (e) {
    console.debug("Error:", e);
    return NextResponse.error();
  }
}
