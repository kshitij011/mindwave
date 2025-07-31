import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hasApiKey: !!process.env.OPENROUTER_API_KEY,
        apiKeyLength: process.env.OPENROUTER_API_KEY
            ? process.env.OPENROUTER_API_KEY.length
            : 0,
        apiKeyPrefix: process.env.OPENROUTER_API_KEY
            ? process.env.OPENROUTER_API_KEY.substring(0, 10)
            : "none",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
}
