import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    return NextResponse.json({
        hasApiKey: !!apiKey,
        apiKeyLength: apiKey ? apiKey.length : 0,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
}
