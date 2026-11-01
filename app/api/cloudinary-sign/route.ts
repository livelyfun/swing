import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paramsToSign } = body;

    const apiSecret = process.env.CLOUDINARY_API_SECRET || "development-cloudinary-secret";
    const apiKey = process.env.CLOUDINARY_API_KEY || "development-key";

    if (!paramsToSign) {
      return NextResponse.json({ error: "Missing paramsToSign" }, { status: 400 });
    }

    // Whitelist parameters to sign
    const sortedKeys = Object.keys(paramsToSign).sort();
    const serializedParams = sortedKeys
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join("&");

    // SHA-1 signature with API secret as required by Cloudinary
    const signature = crypto
      .createHash("sha1")
      .update(serializedParams + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      apiKey,
      timestamp: paramsToSign.timestamp,
    });
  } catch (error) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json({ error: "Internal signing error" }, { status: 500 });
  }
}
