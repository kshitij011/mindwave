import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Simple API working!",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    return NextResponse.json({
        message: "POST working!",
        received: body,
        timestamp: new Date().toISOString(),
    });
}
